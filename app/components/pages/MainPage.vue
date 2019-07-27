<template>
    <Page actionBarHidden="true" @loaded="pageLoaded">

        <RadSideDrawer ref="drawer" :gesturesEnabled="!backButton && actionBar">
            <template>
                <DockLayout ~drawerContent heghit="100%" backgroundColor="#ffffff">
                    <StackLayout dock="top">
                        <Image class="drawer-header" src="~/assets/images/slogo.png" />

                        <GridLayout class="dh-item last">
                            <AbsoluteLayout horizontalAlignment="left">
                                <Image src="~/assets/icons/user.png"/>
                                <label v-if="customer" :text="customer.firstname + ' ' + customer.lastname"/>
                                <label v-else text="Login" @tap="loginTap" class="loginBtn"/>
                            </AbsoluteLayout>
                            <AbsoluteLayout horizontalAlignment="right" @tap="cityNameTap">
                                <Image src="~/assets/icons/location.png"/>
                                <label :text="cityName"/>
                            </AbsoluteLayout>
                        </GridLayout>

                        <ScrollView orientation="vertical" :height="menuItemsConHeight">
                            <StackLayout>
                                <SideMenuItem v-for="route in $vRoutesGroups['1']" :key="route.name"
                                    :route="route" :active="route.name == currentRoute"
                                    @tap="menuItemClick"/>
                                <label class="menuSeperator"/>
                                <SideMenuItem v-for="route in $vRoutesGroups['2']" :key="route.name"
                                    :route="route" :active="route.name == currentRoute"
                                    @tap="menuItemClick"/>
                                <SideMenuItem :route="{name: 'share', text: 'Share the App', icon: 'share'}" @tap="specialRouteTap"/>
                                <label class="menuSeperator"/>

                                <SideMenuItem :route="{name: 'chnageCity', text: 'Change city', icon: 'location'}" @tap="specialRouteTap"/>
                                <SideMenuItem v-if="$customer()" :route="{name: 'logout', text: 'Logout', icon: 'exit'}" @tap="specialRouteTap"/>
                                
                                <label class="copyrightLabel" dock="bottom" text="© WalkOn Retail 2019"/>

                            </StackLayout>
                        </ScrollView>

                    </StackLayout>
                </DockLayout>
            </template>

            <AbsoluteLayout ~mainContent width="100%" height="100%">
                <DockLayout width="100%" height="100%" stretchLastChild="true">

                    <DockLayout v-if="actionBar" class="actionBar" height="50" dock="top" stretchLastChild="true">
                        <Image dock="left" class="menuIcon" :src="backButton ? '~/assets/icons/arrow-back.png' : '~/assets/icons/hamburg.png'" @tap="actionBarMainIconClick" />
                        <Label dock="center" class="title" :text="title"/>
                        
                        <StackLayout dock="right" class="actionBarIcons" orientation="horizontal" horizontalAlignment="right">
                            <ActionBarIcon icon="~/assets/icons/search.png" :count="0" @tap="searchIconTap"/>
                            <ActionBarIcon icon="~/assets/icons/cart.png" :count="cartCount" @tap="cartIconClick" />
                        </StackLayout>

                    </DockLayout>

                    <!-- <AbsoluteLayout v-if="container == 'absolute'" class="pages" dock="bottom">
                        <slot></slot>
                    </AbsoluteLayout>
                    <StackLayout v-else-if="container == 'stack'" class="pages" dock="bottom">
                        <slot></slot>
                    </StackLayout>
                    <template v-else>
                        <slot></slot>
                    </template> -->

                    <AbsoluteLayout dock="bottom" width="100%" height="100%">
                        <transition name="bounce">
                            <component width="100%" height="100%" v-if="currentTabIndex == 0" :is="tabs[0].name" v-bind="tabs[0].props"
                                class="pages" />
                            <component width="100%" height="100%" v-else :is="tabs[1].name" v-bind="tabs[1].props"
                                class="pages" />
                        </transition>
                    </AbsoluteLayout>

                    

                </DockLayout>
                <Spinner backgroundColor="#60ffffff" v-if="loading" align/>
            </AbsoluteLayout>

        </RadSideDrawer>
    </Page>
</template>

<script >
const app = require("application");
const platform = require("platform");
const color = require("color");
import { mapState, mapActions } from 'vuex';
import ActionBarIcon from '../templates/ActionBarIcon';
import SideMenuItem from '../templates/SideMenuItem';
import AccountLogic from '~/logic/account';
import CitySelection from './CitySelection';

import HomePage from './Home';
import FavoritesPage from './Favorites';
import CartPage from './Cart';
import ProductsPage from './Products';
import LoginPage from './Login';
import AccountPage from './Account';
import AddAddressPage from './AddAddress';
import OrdersPage from './Orders';
import OrderInfoPage from './OrderInfo';
import OrderOnPhonePage from './OrderOnPhone';
import OrderOnWhatsappPage from './OrderOnWhatsapp';
import ContactPage from './Contact';
import CompanyInfoPage from './CompanyInfo';
import SearchPage from './Search';
import CustomProductsListPage from './CustomProductsList';

export default {
    components: {
        ActionBarIcon,
        SideMenuItem,
        
        HomePage,
        FavoritesPage,
        CartPage,
        ProductsPage,
        LoginPage,
        AccountPage,
        AddAddressPage,
        OrdersPage,
        OrderInfoPage,
        OrderOnPhonePage,
        OrderOnWhatsappPage,
        ContactPage,
        CompanyInfoPage,
        SearchPage,
        CustomProductsListPage,
    },
    data: () => ({
        menuItemsConHeight: 200,
        currentTabName: 'HomePage',
        currentTabProps: {},
        currentTabIndex: 0,
        tabs: [
            { name: 'HomePage', props: {} },
            { name: '', props: {} }
        ],

        title: 'WalkOn Retail',
        backButton: false,
        actionBar: true,
        loading: false
    }),
    computed: mapState({
        currentRoute: state => state.router.current,
        cartCount: state => state.cart.count,
        customer: state => state.customer,
        cityName: state => state.cityNames[state.baseFetchParams.lang],
        shareText: state => state.gls.share_app_text[state.baseFetchParams.lang],
    }),

    methods: {
        cartIconClick(){
            this.$goTo('cart');
        },
        searchIconTap(){
            this.$goTo('search', null, { animation: 'slideTop' });
        },
        actionBarMainIconClick(){
            if(this.backButton){
                this.$goBack();
            }else{
                this.$refs.drawer.nativeView.showDrawer();
            }
        },
        menuItemClick(route){
            this.$refs.drawer.nativeView.toggleDrawerState();
            this.$goTo(route.name);
        },
        specialRouteTap(route){
            this.$refs.drawer.nativeView.toggleDrawerState();
            if(route.name == 'logout'){
                confirm({
                    title: 'WalkOn Retail',
                    message: 'Do you want to logout?',
                    okButtonText: 'Yes',
                    cancelButtonText: 'No',
                }).then(result => {
                    if(result){
                        if(this.$currentRoute() != 'home'){
                            this.$goTo('home');
                        }
                        alert({
                            title: 'WalkOn Retail',
                            message: 'You have been logged out.',
                            okButtonText: 'OK',
                        });
                        AccountLogic.logout();
                    }
                });
            }else if(route.name == 'share'){
                const SocialShare = require("nativescript-social-share");
                SocialShare.shareText(this.shareText);
            }else if(route.name == 'chnageCity'){
                this.$justNavigate(CitySelection);
            }
        },
        cityNameTap(){
            this.$justNavigate(CitySelection);
        },
        loginTap(){
            this.$refs.drawer.nativeView.toggleDrawerState();
            this.$goTo('login', {tab: 'login'});
        },

        handlePage(route, params, options){
            const nextIndex = this.currentTabIndex == 0 ? 1 : 0;
            const tab = this.tabs[nextIndex];
            tab.name = route.comp;
            tab.props = params || {};
            this.currentTabIndex = nextIndex;
        },

        tabPropsChange(name, value){
            this[name] = value;
        },

        pageLoaded(){
            if (app.android && platform.device.sdkVersion >= "21") {
                const window = app.android.foregroundActivity.getWindow();
                window.setStatusBarColor(new color.Color("#777777").android);
            }
        }
    },

    created(){
        this.menuItemsConHeight = this.$getViewSize().height - 208;
        this.$vRouter.setPagesHandler((route, params, options) => {
            this.handlePage(route, params, options);
        });
        this.$vRouter.setPagesPropsHandler((name, value) => {
            this.tabPropsChange(name, value);
        });
    }
}
</script>

<style lang="scss" scoped>
$iw: 26;
$pad: 8;
.actionBar{
    background-color: white;
    $ah: 50; 
    width: 100%;
    padding: $pad;
    .title{
        text-align: left;
        font-size: 17;
        font-weight: bold;
        background-color: white;
        color: #444;
        margin-top: 6;
        margin-left: 10;
    }
    .menuIcon{
        width: $ah - $pad;
        height: $ah - $pad;
        padding: 8 8 8 0;
        background-color: white;
    }
}
.drawer-header {
    width: 100%;
    padding: 16 16 0 16;
    margin-bottom: 0;
    background-color: white;
    color: #ffffff;
    font-size: 24;
}

.drawer-item {
    padding: 8 16;
    color: #333333;
    font-size: 16;
}
.dh-item{
    $h: 18;
    width: 100%;
    height: $h + 8;
    padding: 4 18 4 22;
    AbsoluteLayout{
        Image{
            width: $h;
            height: $h;
        }
        label{
            margin-left: $h + 2;
            font-size: 14;
            margin-top: -1;
        }
    }
    &.last{
        margin-bottom: 10;
    }
}
.loginBtn{
    text-decoration: underline;
}
.menuSeperator{
    width: 70%;
    height: 1;
    margin: 8 0 4 8;
    background-color: #ddd;
}
.copyrightLabel{
    font-size: 18;
    padding: 10;
}

.bounce-enter-active {
    animation-name: bounce-in;
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
}

.bounce-leave-active {
    animation-name: bounce-in;
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
    animation-direction: reverse;
    animation-timing-function: ease-in-out;
}

@keyframes bounce-in {
    0% {
        opacity: 0;
        transform: scale(0.95);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

// .hideUp-enter-active {
//     animation-name: hideUp-in;
//     animation-duration: 0.4s;
//     animation-fill-mode: forwards;
//     animation-timing-function: ease-in-out;
// }

// .hideUp-leave-active {
//     animation-name: hideUp-in;
//     animation-duration: 0.25s;
//     animation-fill-mode: forwards;
//     animation-direction: reverse;
//     animation-timing-function: ease-in-out;
// }

// @keyframes hideUp-in {
//     0% {
//         opacity: 0;
//         height: 0;
//     }

//     100% {
//         opacity: 1;
//         height: 50;
//     }
// }
</style>

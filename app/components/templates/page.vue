<template>
    <Page actionBarHidden="true" @loaded="pageLoaded">

        <RadSideDrawer ref="drawer" :gesturesEnabled="!backButton && actionBar">
            <template>
                <DockLayout ~drawerContent heghit="100%" backgroundColor="#ffffff">
                    <StackLayout dock="top">
                        <Image class="drawer-header" src="~/assets/images/slogo.png" />
                        <AbsoluteLayout class="dh-item">
                            <Image src="~/assets/icons/location.png"/>
                            <label :text="cityName"/>
                        </AbsoluteLayout>
                        <AbsoluteLayout class="dh-item last">
                            <Image src="~/assets/icons/user.png"/>
                            <label v-if="customer" :text="customer.firstname + ' ' + customer.lastname"/>
                            <label v-else text="Login" @tap="$goTo('login', {tab: 'login'})" class="loginBtn"/>
                        </AbsoluteLayout>

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

                    <AbsoluteLayout v-if="container == 'absolute'" class="pages" dock="bottom">
                        <slot></slot>
                    </AbsoluteLayout>
                    <StackLayout v-else-if="container == 'stack'" class="pages" dock="bottom">
                        <slot></slot>
                    </StackLayout>
                    <ScrollView v-else-if="container == 'scrollStack'" class="pages" dock="bottom" orientation="vertical">
                        <StackLayout orientation="vertical">
                            <slot></slot>
                        </StackLayout>
                    </ScrollView>
                    <template v-else>
                        <slot></slot>
                    </template>

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
import ActionBarIcon from './ActionBarIcon';
import SideMenuItem from './SideMenuItem';
import AccountLogic from '~/logic/account';
import CitySelection from '../pages/CitySelection';

export default {
    components: {
        ActionBarIcon,
        SideMenuItem,
    },
    props: {
        title: {
            type: String,
            default: 'WalkOn Retail',
        },
        backButton: {
            type: Boolean,
            default: false,
        },
        actionBar: {
            type: Boolean,
            default: true,
        },
        container: {
            type: String,
            default: 'absolute',
        },
        loading: {
            type: Boolean,
            default: false,
        }
    },
    data: () => ({
        menuItemsConHeight: 200,
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
            this.$goTo(route.name);
            // this.$refs.drawer.nativeView.toggleDrawerState();
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

        pageLoaded(){
            if (app.android && platform.device.sdkVersion >= "21") {
                const window = app.android.foregroundActivity.getWindow();
                window.setStatusBarColor(new color.Color("#777777").android);
            }
        }
    },

    created(){
        this.menuItemsConHeight = this.$getViewSize().height - 208;
    }
}
</script>

<style lang="scss" scoped>
$iw: 26;
$pad: 8;
.actionBar{
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
    $h: 20;
    width: 100%;
    height: $h + 8;
    padding: 4 4 4 18;
    Image{
        width: $h;
        height: $h;
    }
    label{
        margin-left: $h + 2;
        font-size: 16;
        margin-top: -1;
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
    margin: 8 0 4 -20;
    background-color: #ddd;
}
.copyrightLabel{
    font-size: 18;
    padding: 10;
}
</style>

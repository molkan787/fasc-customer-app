<template>
    <MPage :title="titles[currentPageIndex]" :backButton="currentPageIndex > 0">
        <DockLayout width="100%" height="100%" class="root" stretchLastChild="true">

            <Pager width="100%" height="100%" :selectedIndex="currentPageIndex" disableSwipe="true">
                <PagerItem>
                    <StackLayout>
                        <StackLayout width="100%" class="header" >
                            <Image src="~/assets/images/generic-user-purple.png"/>
                            <label :text="customerName"/>
                        </StackLayout>
                        <CardsPager :items="cards" @tapped="cardTapped"/>
                    </StackLayout>
                </PagerItem>

                <PagerItem>
                    <SettingsPage />
                </PagerItem>

                <PagerItem>
                    <AddressesPage />
                </PagerItem>
            </Pager>

        </DockLayout>
    </MPage>
</template>

<script>
import CardsPager from '../elements/CardsPager';
import AddressesPage from './AccountPages/Addresses';
import SettingsPage from './AccountPages/Settings';

export default {
    components: {
        CardsPager,
        AddressesPage,
        SettingsPage,
    },
    props: {
        tabIndex: {
            type: Number,
            default: 0,
        }
    },
    computed: {
        customerName(){
            const c = this.$customer();
            if(!c) return '';
            return c.firstname + ' ' + c.lastname;
        }
    },
    data: () => ({
        titles: [
            'My Account',
            'Settings',
            'Addresses'
        ],
        currentPageIndex: 0,

        cards: [
            {icon: 'card_circle', text: 'Addresses', name: 'addresses'},
            {icon: 'heart_cricle', text: 'Favorites', name: 'favorites'},
            {icon: 'help_circle', text: 'Support', name: 'support'},
            {icon: 'settings_circle', text: 'Settings', name: 'settings'},
        ]
    }),
    methods: {

        cardTapped(name){
            if(name == "favorites"){
                this.$goTo('fav');
            }else if(name == 'support'){
                this.$goTo('contact');
            }else{
                if(name == 'settings'){
                    this.currentPageIndex = 1;
                }else if(name == 'addresses'){
                    this.currentPageIndex = 2;
                }
                this.$vRouter.setOneTimeBackHandler(() => {
                    this.currentPageIndex = 0;
                });
            }
        },
    },

    mounted(){
        this.currentPageIndex = this.tabIndex;
    }
}
</script>

<style lang="scss" scoped>
.header{
    width: 100%;
    padding: 14;
    text-align: center;
    Image{
        width: 25%;
    }
    label{
        font-size: 20;
        font-weight: bold;
        color: #333;
        margin: 10 0 10 0;
    }
}
.title{
    font-size: 16;
    margin-bottom: 4;
}
</style>


<template>
    <Page actionBarHidden="true" @loaded="pageLoaded">

        <RadSideDrawer ref="drawer">
            <template>
                <StackLayout ~drawerContent backgroundColor="#ffffff">
                    <Image class="drawer-header" src="~/assets/images/slogo.png" />

                    <label text="I am the side MENU"></label>
                    <!-- <Label class="drawer-item" v-for="(item, index) in menuItems"
                    :text="item" :key="index" @tap="menuItemClick(item)"/> -->
                </StackLayout>
            </template>

            <DockLayout ~mainContent width="100%" height="100%" stretchLastChild="true">
                <DockLayout class="actionBar" height="50" dock="top" stretchLastChild="true">
                    <Image dock="left" class="menuIcon" src="~/assets/icons/hamburg.png" @tap="$refs.drawer.nativeView.showDrawer()" />
                    <Label dock="right" class="title" :text="title"/>
                </DockLayout>
                <AbsoluteLayout class="pages" dock="bottom">
                    <!-- Pages area -->
                    <HomePage />
                </AbsoluteLayout>
            </DockLayout>
        </RadSideDrawer>
    </Page>
</template>

<script >
const app = require("application");
const platform = require("platform");
const color = require("color");
import { mapState, mapActions } from 'vuex';
import HomePage from './pages/Home';


export default {
    components: {
        HomePage,
    },
    data() {
        return {
            title: 'WalkOn Retail',
            msg: 'Hello World!',
        }
    },
    computed: {
    },

    methods: {
        ...mapActions(['setup']),
        menuItemClick(text){
            this.title = text;
            this.$refs.drawer.nativeView.toggleDrawerState();
        },

        pageLoaded(args){

            const page = args.object;

            if (app.android && platform.device.sdkVersion >= "21") {
                const window = app.android.foregroundActivity.getWindow();
                window.setStatusBarColor(new color.Color("#777777").android);
            }
        }
    },

    created(){
        // this.setup();
    }
}
</script>

<style lang="scss" scoped>
.actionBar{
    padding: 14;

    .title{
        text-align: left;
        font-size: 20;
        background-color: white;
        color: #3a3a3a;
        margin-top: -4;
        margin-left: 10;
    }
}
.pages{
    background-color: white;
}
.page{
    background-color: white;
}

.drawer-header {
    width: 100%;
    padding: 16;
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
</style>

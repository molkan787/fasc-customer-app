<template>
    <Page actionBarHidden="true" @loaded="pageLoaded">
        <AbsoluteLayout width="100%" height="100%">
            <Image class="bg" stretch="fill" src="~/assets/images/welcome_bg.png" marginTop="-100"/>
            <StackLayout width="100%" height="100%">
                <GridLayout class="segment" width="100%" height="50%" padding="0 20 20 20">
                    <Image src="~/assets/images/slogo.png" width="100%" horizontalAlignment="center" marginBottom="10"/>
                    <label :text="text" textWrap="true" class="text"
                        horizontalAlignment="center" verticalAlignment="bottom" height="80"/>
                </GridLayout>
                <GridLayout rows="*" class="segment" width="100%" height="50%" padding="10">

                    <StackLayout row="0" horizontalAlignment="center" verticalAlignment="center" paddingTop="20">
                        <CardView class="lbtn_parent" radius="44" ripple="true" elevation="0" @tap="langSelected('en')">
                            <StackLayout class="lbtn"
                                :backgroundColor="lang == 'en' ? '#F36F24' : 'white'" >
                                <label text="ENGLISH"  width="140" :color="lang == 'en' ? 'white' : '#F36F24'"/>
                            </StackLayout>
                        </CardView>

                        <CardView class="lbtn_parent" radius="44" ripple="true" elevation="0" @tap="langSelected('hi')">
                            <StackLayout class="lbtn"
                                :backgroundColor="lang == 'hi' ? '#F36F24' : 'white'" >
                                <label text="HINDI"  width="140" :color="lang == 'hi' ? 'white' : '#F36F24'"/>
                            </StackLayout>
                        </CardView>

                        <SolidButton @tap="continueTap" text="Continue" radius="5"/>
                    </StackLayout>

                </GridLayout>
            </StackLayout>
        </AbsoluteLayout>
    </Page>
</template>

<script>
const app = require("application");
const platform = require("platform");
const color = require("color");
import Starter from '~/logic/starter';
import { mapState } from 'vuex';

export default {
    data: () => ({
        lang: 'en',
        langId: 1,
    }),
    computed: {
        ...mapState({
            texts: state => state.gls.welcome_text,
        }),
        text(){
            if(!this.texts) return '';
            return this.texts[this.langId];
        },
        continueTap(){
            Starter.nextStep('welcome');
        }
    },
    methods: {
        langSelected(lang){
            this.lang = lang;
            this.langId = lang == 'en' ? 1 : 2;
        },

        pageLoaded(){
            if (app.android && platform.device.sdkVersion >= "21") {
                const window = app.android.foregroundActivity.getWindow();
                window.setStatusBarColor(new color.Color("#f8a06f").android);
            }
        }
    }
}
</script>


<style lang="scss" scoped>
@import '~/styles/vars';
.bg{
    height: 100%;
    width: 100%;
}
.text{
    font-size: 23;
    color: white;
    text-align: center;
}
.lbtn_parent{
    margin-bottom: 10;
}
.lbtn{
    background-color: white;
    border-width: 1;
    border-color: $primary-color;
    border-radius: 40;
    label{
        font-size: 17;
        font-weight: bold;
        text-align: center;
        padding: 10;
    }
}
.selectLangLbl{
    padding: 4;
    font-size: 16;
    color: #444;
}
</style>

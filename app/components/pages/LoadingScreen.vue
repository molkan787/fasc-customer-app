<template>
    <Page actionBarHidden="true">
        <AbsoluteLayout width="100%" height="100%">
            <StackLayout width="100%" height="100%">
                <GridLayout class="segment" width="100%" height="50%" padding="0 20 20 20">
                    <Image src="~/assets/images/slogo.png" width="100%" horizontalAlignment="center" marginBottom="10"/>
                    <label text="WalkOn Retail" textWrap="true" class="text"
                        horizontalAlignment="center" verticalAlignment="bottom" height="80"/>
                </GridLayout>
                <GridLayout rows="*" class="segment" width="100%" height="50%" marginTop="-50" @tap="retryTap">

                    <StackLayout row="0" horizontalAlignment="center" verticalAlignment="center">

                        <Spinner v-if="loading"/>
                        <label v-else class="errorText" :text="'Something went wrong,\ntap to try again'" textWrap="true"/>

                    </StackLayout>

                </GridLayout>
            </StackLayout>
        </AbsoluteLayout>
    </Page>
</template>

<script>
import DM from '~/struct/dm';
import { mapState } from 'vuex';

export default {
    data: () => ({
        loading: true,
    }),
    methods: {
        loadData(){
            DM.loadAsd()
            .then(data => {
                setTimeout(() => this.$starter.nextStep('asd'), 100);
            })
            .catch(err => {
                console.log(err);
                this.loading = false;
            })
        },
        retryTap(){
            if(!this.loading){
                this.loadData();
            }
        },
    },

    mounted(){
        this.loadData();
    }
}
</script>


<style lang="scss" scoped>
.text{
    font-size: 23;
    color: white;
    text-align: center;
}
.errorText{
    font-size: 23;
    color: #F44336;
    text-align: center;
}
</style>

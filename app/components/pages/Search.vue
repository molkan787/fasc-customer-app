<template>
    <MPage :actionBar="false">
        <DockLayout width="100%" height="100%" stretchLastChild="true">
            <GridLayout columns="34, *" rows="34" dock="top" class="searchBar" >
                <Image row="0" col="0" class="backButton" src="~/assets/icons/arrow-back.png" @tap="backButtonTap" />
                <TextField row="0" col="1" class="searchField" v-model="searchText" hint="type to search" />
                <GridLayout row="0" col="1" width="34" height="34" horizontalAlignment="right" @tap="voiceSearch">
                    <Spinner v-if="speechLoading" size="26" horizontalAlignment="center" verticalAlignment="center"/>
                    <Image v-else src="~/assets/icons/microphone.png" opacity="0.3" width="70%" height="70%" margin="15%"/>
                </GridLayout>
            </GridLayout>
            <AbsoluteLayout dock="bottom">
                <Spinner align v-if="view == 'loading'"/>
                <ProductsList v-else-if="view == 'items'" :items="items" />
                <ImagePlaceholder v-else-if="view == 'error'" text="Something went wrong" image="icons/no_net_outline.png"/>

                <ShadowBar size="4" opacity="0.1"/>
            </AbsoluteLayout>
        </DockLayout>
    </MPage>
</template>

<script>
import ProductsList from '../elements/ProductsList';
import SpeechRecognition from '../../struct/speechRecognition';
import DM from '~/struct/dm';

export default {
    components: {
        ProductsList,
    },
    data: () => ({
        timer: 0,
        view: '',

        searchText: '',
        items: [],

        speechLoading: false,
    }),
    watch: {
        searchText(){
            this.textChanged();
        }
    },
    methods: {
        backButtonTap(){
            this.$goBack();
        },

        textChanged(){
            this.stopTimer();
            if(this.searchText.length >= 3){
                this.scheduleSearch();
            }
        },

        stopTimer(){
            clearTimeout(this.timer);
        },
        scheduleSearch(){
            this.timer = setTimeout(() => {
                this.search();
            }, 300);
        },

        search(){
            this.view = 'loading';
            DM.searchProducts(this.searchText)
            .then(items => {
                this.items = items;
                this.view = 'items';
            })
            .catch(err => {
                if(err != 'EXPIRED'){
                    this.view = 'error';
                }
            });
        },

        voiceSearch(){
            if(this.speechLoading) return;

            this.speechLoading = true;
            SpeechRecognition.start()
            .then(text => {
                this.searchText = text;
                this.search();
            })
            .catch(err => console.log('SpeechRecognition:', err))
            .finally(() => {
                this.speechLoading = false;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
$pad: 8;
.searchBar{
    $ah: 50;
    height: $ah;
    width: 100%;
    padding: $pad;
    .searchField{
        text-align: left;
        font-size: 17;
        background-color: #f5f5f5;
        border-width: 1;
        border-color: #f0f0f0;
        color: #666;
        border-radius: 4;
        padding: 0 0 0 8;
    }
    .backButton{
        width: $ah - $pad;
        height: $ah - $pad;
        padding: 8 8 8 0;
        background-color: white;
    }
}
</style>

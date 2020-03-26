<template>
    <AbsoluteLayout class="root" width="100%" height="100%">
        <PullToRefresh width="100%" height="100%" @refresh="pullRefresh">
            <ListView ref="listview" v-if="items.length > 0" for="(item, index) in items" width="100%" height="100%">
                <v-template>
                    <ProductItem :void="rendered(index)" :data="item" @tap="itemTapped(item)" :showCartTools="showCartTools" />
                </v-template>
            </ListView>
            <ImagePlaceholder v-else height="400" image="icons/package.png" text="Nothing to show here"/>

            <!-- <ScrollView orientation="vertical" width="100%" height="100%">
                <StackLayout orientation="vertical" :padding="padding">
                    <ProductItem v-for="(item) in items" :key="item.product_id" :data="item" @tap="itemTapped(item)" :showCartTools="showCartTools" />
                    <ImagePlaceholder height="400" v-if="items.length == 0" image="icons/package.png" text="Nothing to show here"/>
                </StackLayout>
            </ScrollView> -->

        </PullToRefresh>
    </AbsoluteLayout>
</template>

<script>
import LiveDataUpdater from '~/logic/liveDataUpdater';
import ProductItem from './ProductItem';
export default {
    components: {
        ProductItem,
    },
    props: {
        items: {
            type: Array,
            default: [],
        },
        showCartTools: {
            type: Boolean,
            default: false,
        },

        padding: {
            default: '',
        }
    },
    data: () => ({
        show: {}
    }),
    watch: {
        items(){
            this.emitIds();
        }
    },
    methods: {
        emitIds(){
            const ids = this.items.map(item => item.product_id);
            LiveDataUpdater.setCheckIds(ids);
        },
        itemTapped(item){
            this.$goTo('productInfo', {initialData: item}, { modal: true });
        },

        pullRefresh(args){
            this.$emit('requestRefresh', () => args.object.refreshing = false);
        },

        rendered(index){
            if(index >= this.items.length - 10){
                this.$emit('requestMoreItems');
            }
        }
    },
    mounted(){
        this.emitIds();
        this.$refs.listview
    }
}
</script>

<style lang="scss" scoped>
.root{
    height: 100%;
    width: 100%;
    background-color: #fafafa;
}
</style>

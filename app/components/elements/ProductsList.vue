<template>
    <AbsoluteLayout class="root" width="100%" height="100%">
        <ScrollView orientation="vertical" width="100%" height="100%">
            <StackLayout orientation="vertical" :padding="padding">
                <ProductItem v-for="(item) in items" :key="item.product_id" :data="item" @tap="itemTapped(item)" :showCartTools="showCartTools" />
            </StackLayout>
        </ScrollView>
        <ImagePlaceholder v-if="items.length == 0" image="icons/package.png" text="Nothing to show here"/>
    </AbsoluteLayout>
</template>

<script>
import Vue from 'nativescript-vue'
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
    methods: {
        itemTapped(item){
            this.$goTo('productInfo', {initialData: item}, { modal: true });
        },
    },
}
</script>

<style lang="scss" scoped>
.root{
    height: 100%;
    width: 100%;
    background-color: #fafafa;
}
</style>

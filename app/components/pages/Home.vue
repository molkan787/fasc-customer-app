<template>
    <page container="stack">
        <Banners :items="banners" />
        <Categories title="Categories" :items="categories" class="cats cat_con" @itemTapped="catTapped"/>
        <Categories title="Brands" :items="brands" class="cat_con" @itemTapped="catTapped"/>
    </page>
</template>

<script>
import page from '../templates/page';
import Banners from '../elements/Banners';
import Categories from '../elements/Categories';
import { mapState } from 'vuex';
import dm from '~/struct/dm';

export default {
    components: {
        page,
        Banners,
        Categories,
    },
    data(){
        return {
            categories: [],
            brands: [],
        }
    },
    methods: {
        updateItems(){
            if(!(this.items instanceof Array)) return;
            this.categories = this.items.filter(item => parseInt(item.gtype) == 0);
            this.brands = this.items.filter(item => parseInt(item.gtype) == 1);
        },
        catTapped(catId){
            this.$goTo('products', {catId});
        }
    },
    computed: mapState({
        items: state => state.categories,
        banners: state => state.banners,
    }),
    watch: {
        items: function () { this.updateItems() }
    },
    mounted(){
        this.updateItems();
    }
}
</script>

<style lang="scss" scoped>
.cat_con{
    margin-top: 6;
}
.cats{
    margin-bottom: 16;
}
</style>

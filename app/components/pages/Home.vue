<template>
    <page container="scrollStack">
        <Banners :items="banners" />
        <Categories title="Categories" :items="categories" class="cats cat_con" @itemTapped="catTapped"/>
        <Categories title="Brands" :items="brands" class="cat_con" @itemTapped="catTapped"/>
        <transition name="fade">
            <label v-if="ads.length" class="separator"/>
        </transition>
        <transition name="fade">
            <Ads v-if="ads.length" :items="ads" />
        </transition>
    </page>
</template>

<script>
import page from '../templates/page';
import Banners from '../elements/Banners';
import Categories from '../elements/Categories';
import Ads from '../elements/Ads';
import { mapState } from 'vuex';
import dm from '~/struct/dm';

export default {
    components: {
        page,
        Banners,
        Categories,
        Ads,
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
        ads: state => state.ads,
    }),
    watch: {
        items: function () { this.updateItems() }
    },
    mounted(){
        this.updateItems();
        dm.scheduleLoadAds();
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

.fade-enter-active {
    animation-name: fade-in;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
}

.fade-leave-active {
    animation-name: fade-in;
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
    animation-direction: reverse;
    animation-timing-function: ease-in-out;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
.separator{
    width: 80%;
    height: 1;
    background-color: #e0e0e0;
    margin: 20 0 20 0;
}
</style>

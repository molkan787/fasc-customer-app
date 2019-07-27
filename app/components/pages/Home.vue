<template>
    <page container="absolute" :backButton="currentPageIndex > 0">
        <Pager width="100%" height="100%" :selectedIndex="currentPageIndex" disableSwipe="true">
            <PagerItem>
                <ScrollView width="100%" height="100%" >
                    <StackLayout>
                        <Banners :items="banners" />
                        <Categories title="Categories" name="categories" :items="categories" class="cats cat_con" @viewAllTap="viewAllTap" @itemTapped="catTapped"/>
                        <Categories title="Brands" name="brands" :items="brands" class="cat_con" @viewAllTap="viewAllTap" @itemTapped="catTapped"/>
                        <transition name="fade">
                            <label v-if="ads.length" class="separator"/>
                        </transition>
                        <transition name="fade">
                            <Ads v-if="ads.length" :items="ads" />
                        </transition>
                    </StackLayout>
                </ScrollView>
            </PagerItem>
            <PagerItem>
                <CategoriesGrid :title="viewAllTitle" class="cat_con" :items="viewAllItems" @itemTapped="catTapped"/>
            </PagerItem>
        </Pager>
    </page>
</template>

<script>
import page from '../templates/page';
import Banners from '../elements/Banners';
import Categories from '../elements/Categories';
import CategoriesGrid from '../elements/CategoriesGrid';
import Ads from '../elements/Ads';
import { mapState } from 'vuex';
import dm from '~/struct/dm';

export default {
    components: {
        page,
        Banners,
        Categories,
        CategoriesGrid,
        Ads,
    },
    data: () => ({
        currentPageIndex: 0,
        categories: [],
        brands: [],
        viewAllItems: [],
        viewAllTitle: '',
    }),
    methods: {
        updateItems(){
            if(!(this.items instanceof Array)) return;
            this.categories = this.items.filter(item => parseInt(item.gtype) == 0);
            this.brands = this.items.filter(item => parseInt(item.gtype) == 1);
        },
        catTapped(catId){
            this.$goTo('products', {catId});
        },

        viewAllTap(type){
            this.viewAllTitle = type == 'brands' ? 'Brands' : 'Categories';
            this.viewAllItems = type == 'brands' ? this.brands : this.categories;
            this.currentPageIndex = 1;
            this.$vRouter.setOneTimeBackHandler(() => {
                this.currentPageIndex = 0;
            })
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

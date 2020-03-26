<template>
    <page :title="title" backButton>
        <DockLayout width="100%" height="100%" stretchLastChild="true">
            <CategorySelector dock="top" :items="cats" :subs="subs" @changed="catChanged"/>
            <!-- <ShadowBar dock="top" size="20" marginBottom="-20" ref="shadow"/> -->

            <Spinner dock="bottom" v-if="loading" align :size="60" />
            <ProductsList @requestMoreItems="loadMoreItems" dock="bottom" v-else :items="items" @requestRefresh="pullRefresh" />

        </DockLayout>
    </page>
</template>

<script>
import page from '../templates/page';
import ProductsList from '../elements/ProductsList';
import CategorySelector from '../elements/CategorySelector';
import { mapState } from 'vuex';
export default {
    components: {
        page,
        ProductsList,
        CategorySelector,
    },
    props: {
        catId: {
            default: 0,
        }
    },
    computed: mapState(['categoriesMapped']),
    data: () => ({
        loading: false,
        fetching: false,
        title: '',
        cats: [],
        subs: [],
        items: [],
        subCatId: 0,
        childSubCatId: 0,
    }),
    methods: {
        pullRefresh(callback){
            this.loadItems(true).then(() => callback());
        },
        loadMoreItems(){
            // this.items.length % 20 != 0 means we reached the end
            if(this.fetching || this.items.length % 20 != 0) return;
            this.loadItems(true, this.items.length)
        },
        catChanged(arg){
            if(this.subCatId != arg.cat){
                this.subs = [];
            }
            this.subCatId = arg.cat;
            this.childSubCatId = arg.sub;
            this.loadItems();
        },
        async loadItems(skipSpinner, offset){
            if(!skipSpinner) this.loading = true;
            this.fetching = true;
            const filters = {
                cat: this.catId,
                subcat: this.subCatId || '',
                child_subcat: this.childSubCatId || '',
                start: offset || '0',
                limit: '20'
            }
            
            try {
                const {items, child_subcat} = await this.$dm.getProducts(filters)
                if(offset){
                    this.items = [...this.items, ...items];
                }else{
                    this.items = items;
                }
                if(child_subcat.length == 0){
                    if(!this.childSubCatId) this.subs = [];
                }else{
                    this.subs = child_subcat
                }
            } catch (error) {
                this.items = [];
                this.subs = [];
            }
            this.loading = false;
            this.fetching = false;
        }
    },
    mounted(){
        const cat = this.categoriesMapped[this.catId];
        this.cats = cat.subs;
        this.title = cat.name;
        this.loadItems();
    }
}
</script>

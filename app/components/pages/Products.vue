<template>
    <page :title="title" backButton>
        <DockLayout width="100%" height="100%" stretchLastChild="true">
            <CategorySelector dock="top" :items="cats" :subs="subs" @changed="catChanged"/>
            <!-- <ShadowBar dock="top" size="20" marginBottom="-20" ref="shadow"/> -->

            <Spinner dock="bottom" v-if="loading" align :size="60" />
            <ProductsList dock="bottom" v-else :items="items" />

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
        title: '',
        cats: [],
        subs: [],
        items: [
            {
                "product_id": "60",
                "quantity": "8",
                "title": "Amulya Dairy Whitner 200 Gm",
                "price": "80.0000",
                "spf": "250",
                "spf_unit": "GM",
                "discount_amt": "0",
                "discount_type": "2",
                "image": "http://169.254.80.80/image/cache/catalog/Products/62baec6a4c187dbfa6fecf8e50db7c83-120x120.jpg",
            },
            {
                "product_id": "58",
                "quantity": "920",
                "title": "Cadboury bournvita 800 gm jar",
                "price": "215.0000",
                "spf": "0",
                "spf_unit": "",
                "discount_amt": "50",
                "discount_type": "2",
                "image": "http://169.254.80.80/image/cache/catalog/Products/klmjthrf-120x120.jpg",
            },
            {
                "product_id": "55",
                "quantity": "35",
                "title": "Agrawals 420 sada papad 500 gm",
                "price": "115.0000",
                "spf": "80",
                "spf_unit": "ML",
                "discount_amt": "0",
                "discount_type": "0",
                "image": "http://169.254.80.80/image/cache/catalog/Products/klgdfjhldfh-120x120.png",
            },
            {
                "product_id": "75",
                "quantity": "35",
                "title": "Agrawals 420 sada papad 500 gm",
                "price": "115.0000",
                "spf": "0",
                "spf_unit": "",
                "discount_amt": "0",
                "discount_type": "0",
                "image": "http://169.254.80.80/image/cache/catalog/Products/klmjthrf-120x120.jpg",
            },
            {
                "product_id": "535",
                "quantity": "35",
                "title": "Agrawals 420 sada papad 500 gm",
                "price": "115.0000",
                "spf": "0",
                "spf_unit": "",
                "discount_amt": "0",
                "discount_type": "0",
                "image": "http://169.254.80.80/image/cache/catalog/Products/klgdfjhldfh-120x120.png",
            },
            {
                "product_id": "550",
                "quantity": "35",
                "title": "Agrawals 420 sada papad 500 gm",
                "price": "115.0000",
                "spf": "0",
                "spf_unit": "",
                "discount_amt": "0",
                "discount_type": "0",
                "image": "http://169.254.80.80/image/cache/catalog/Products/klmjthrf-120x120.jpg",
            },
            {
                "product_id": "99",
                "quantity": "35",
                "title": "Agrawals 420 sada papad 500 gm",
                "price": "115.0000",
                "spf": "0",
                "spf_unit": "",
                "discount_amt": "0",
                "discount_type": "0",
                "image": "http://169.254.80.80/image/cache/catalog/Products/klgdfjhldfh-120x120.png",
            }
        ],
        subCatId: 0,
        childSubCatId: 0,
    }),
    methods: {
        catChanged(arg){
            if(this.subCatId != arg.cat){
                this.subs = [];
            }
            this.subCatId = arg.cat;
            this.childSubCatId = arg.sub;
            this.loadItems();
        },
        loadItems(){
            this.loading = true;
            const filters = {
                cat: this.catId,
                subcat: this.subCatId || '',
                child_subcat: this.childSubCatId || '',
            }
            // console.log('Filters:', filters)
            this.$dm.getProducts(filters).then(({items, child_subcat}) => {
                this.items = items;
                if(child_subcat.length == 0){
                    if(!this.childSubCatId) this.subs = [];
                }else{
                    this.subs = child_subcat
                }
                this.loading = false;
            });
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

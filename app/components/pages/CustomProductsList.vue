<template>
    <MPage title="Promotion" backButton>
        <Spinner v-if="loading" align />
        <ProductsList v-else-if="items.length" :items="items"/>
        <ImagePlaceholder v-else-if="error" text="Something went wrong" image="icons/no_net_outline.png"/>
        <ImagePlaceholder v-else image="icons/package.png" text="Nothing to show here"/>
    </MPage>
</template>

<script>
import ProductsList from '../elements/ProductsList';
import DM from '~/struct/dm';

export default {
    components: {
        ProductsList,
    },
    props: {
        ids: {
            type: String,
            default: '',
        }
    },
    data: () => ({
        loading: true,
        error: false,
        items: [],
    }),
    methods: {
        loadData(){
            if(!this.ids){
                this.loading = false;
                return;
            }
            this.error = false;
            this.loading = true;
            DM.loadProductsList(this.ids)
            .then(items => {
                this.items = items;
            })
            .catch(err => {
                this.error = true;
            })
            .finally(() => {
                this.loading = false;
            });
        }
    },

    mounted(){
        this.loadData();
    }
}
</script>

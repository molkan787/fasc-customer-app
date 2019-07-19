<template>
    <MPage title="My Favorites">
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
    data: () => ({
        loading: true,
        error: false,
        items: [],
    }),
    methods: {
        loadData(){
            this.error = false;
            this.loading = true;
            DM.loadFavoriteProducts()
            .then(items => {
                this.items = items;
            })
            .catch(err => {
                this.error = true;
                console.log(err);
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

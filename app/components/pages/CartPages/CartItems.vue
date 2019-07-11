<template>
    <ProductsList showCartTools :items="items" padding="1 0 50 0"/>
</template>

<script>
import { mapState } from 'vuex';
import ProductsList from '../../elements/ProductsList';

export default {
    components: {
        ProductsList,
    },
    computed: mapState({
        items: state => state.cart.items,
    })
}
</script>

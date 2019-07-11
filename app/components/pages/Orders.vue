<template>
    <MPage title="My Orders" >
        <ScrollView width="100%" height="100%">
            <StackLayout width="100%">
                <OrderItem v-for="item in items" :key="item.order_id" :data="item" @tap="itemTapped" />
            </StackLayout>
        </ScrollView>
        <ImagePlaceholder v-if="items.length == 0 && !loading" image="icons/package.png" text="Nothing to show here"/>
        <Spinner v-if="loading" align />
        <ShadowBar size="8" opacity="0.1"/>
    </MPage>
</template>

<script>
import OrderItem from '../elements/OrderItem';
import OrdersLogic from '~/logic/orders';

export default {
    components: {
        OrderItem,
    },
    data: () => ({
        loading: true,
        items: [],
    }),
    methods: {
        itemTapped(data){
            this.$goTo('orderInfo', { orderId: data.order_id })
        }
    },

    created(){
        OrdersLogic.loadOrders().then(orders => {
            this.items = orders;
        })
        .catch(err => {
            this.$alert('We cound not load yout orders, Please try again.');
        })
        .finally(() => {
            this.loading = false;
        })
    }
}
</script>

<template>
    <MPage :title="'Order #' + orderId" backButton>
        <ScrollView width="100%" height="100%">
            <StackLayout width="100%">

                <OrderItem :data="data" :cancelButton="data.can_cancel" @cancelTap="cancelTapped" ripple="false" />
                
                <CardView class="card" elevation="2" radius="6" width="96%" horizontalAlignment="center">
                    <GridLayout rows="30, 30, 30" columns="*" width="100%" padding="10">
                        <label row="0" col="0" :text="'Delivery date: ' + deliveryDate"/>
                        <label row="1" col="0" :text="'Delivery timing: ' + data.del_timing"/>
                        <label row="2" col="0" :text="'Delivery address: ' + deliveryAddress" textWrap="true"/>
                    </GridLayout>
                </CardView>

                <CardView class="card" elevation="2" radius="6" width="96%" horizontalAlignment="center">
                    <ProductsTable :items="data.items" />
                </CardView>

            </StackLayout>
        </ScrollView>
        <Spinner v-if="loading" align backgroundColor="white"/>
        <Spinner v-if="loading2" align backgroundColor="#50ffffff"/>
        <ShadowBar size="6" opacity="0.1"/>
    </MPage>
</template>

<script>
import ProductsTable from '../elements/ProductsTable';
import OrderItem from '../elements/OrderItem';
import OrdersLogic from '~/logic/orders';
import Helper from '~/logic/helper';

export default {
    components: {
        ProductsTable,
        OrderItem,
    },
    props: {
        orderId: {
            default: '0',
        }
    },
    data: () => ({
        loading: true,
        loading2: false,
        data: {
            items: [],
        },
        deliveryDate: '',
        deliveryAddress: '',
    }),
    methods: {
        loadData(){
            OrdersLogic.loadOrderDetails(this.orderId)
            .then(data => {
                this.data = data;
                this.deliveryDate = new Date(data.del_date).toLocaleDateString();
                this.deliveryAddress = Helper.addressObjectToString({
                    address_1: data.shipping_address_1,
                    address_2: data.shipping_address_2,
                    city: data.shipping_city,
                });
                this.loading = false;
            })
            .catch(err => {
                this.$alert('We could not load order details.').then(() => {
                    this.$goBack();
                })
            })
        },

        cancelTapped(){
            this.$confirm('Are you sure you want to cancel this order?')
            .then(result => {
                if(!result) return;
                this.loading2 = true;
                OrdersLogic.cancelOrder(this.orderId)
                .then(() => {
                    this.data.order_status_id = '7';
                    this.$alert('Your Order was successfully canceled.');
                })
                .catch(err => {
                    if(err == 'too_late'){
                        this.data.can_cancel = false;
                        this.$alert('We are sorry but it is too late to cancel the order.');
                    }else{
                        this.$alert('We could not complete the current action, Please try again.')
                    }
                })
                .finally(() => {
                    this.loading2 = false;
                });
            });
        }
    },

    mounted(){
        this.loadData();
    }
}
</script>

<style lang="scss" scoped>
.card{
    margin-top: 8;
}
label{
    color: #444;
    font-size: 16;
}
</style>

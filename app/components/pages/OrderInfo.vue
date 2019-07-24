<template>
    <MPage :title="'Order #' + orderId" backButton>
        <ScrollView width="100%" height="100%">
            <StackLayout width="100%">

                <OrderItem :data="data" :cancelButton="data.can_cancel" @cancelTap="cancelTapped" :ripple="false" />

                <Card horizontalAlignment="center" width="100%" height="161" container="stack" contentPadding="6 12 6 12">
                    <GridLayout rows="30, 52, 52" columns="*" width="100%" padding="10 14 10 14">
                        <label row="0" col="0" :text="'Delivery date: ' + deliveryDate" textWrap="true"/>
                        <label row="1" col="0" :text="'Delivery timing:\n' + data.del_timing" textWrap="true"/>
                        <label row="2" col="0" :text="'Delivery address:\n' + deliveryAddress" textWrap="true"/>
                    </GridLayout>
                </Card>

                <Card horizontalAlignment="center" width="100%" height="300" container="stack" contentPadding="6 12 6 12">
                    <GridLayout width="100%" height="40" padding="10 8 0 14">
                        <label text="Items" horizontalAlignment="left" fontSize="16" />
                        <SolidButton row="2" col="1" text="Download invoice" horizontalAlignment="right" width="160" height="30"
                            radius="6" backgroundColor="#F0F0F0" color="#909090" fontSize="14" padding="5 10 5 10" @tap="downloadInvoice" />
                        <Spinner v-if="downloading" size="24" backgroundColor="#90FFFFFF" horizontalAlignment="right" width="160" height="30" align />
                    </GridLayout>
                    <ProductsTable :items="data.items" />
                </Card>

            </StackLayout>
        </ScrollView>
        <Spinner v-if="loading" align backgroundColor="white"/>
        <Spinner v-if="loading2" align backgroundColor="#50ffffff"/>
        <ShadowBar size="6" opacity="0.1"/>
    </MPage>
</template>

<script>
import Form from '../templates/form/Form';
import ValueField from '../templates/form/ValueField';
import ProductsTable from '../elements/ProductsTable';
import OrderItem from '../elements/OrderItem';
import OrdersLogic from '~/logic/orders';
import Helper from '~/logic/helper';

export default {
    components: {
        Form,
        ValueField,
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
        downloading: false,
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
        },

        downloadInvoice(){
            // this.downloading = true;
            OrdersLogic.downloadInvoice(this.orderId);
            // .then(result => {
            //     this.downloading = false;
            //     console.log('Download result:', result);
            // })
        }
    },

    mounted(){
        this.loadData();
    }
}
</script>

<style lang="scss" scoped>
label{
    color: #444;
    font-size: 16;
}
</style>

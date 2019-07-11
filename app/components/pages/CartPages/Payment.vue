<template>
    <AbsoluteLayout width="100%" height="100%">
        <StackLayout width="100%" height="100%">

            <StackLayout class="total">
                <label class="text" text="Total order value"/>
                <label class="value" :text="total | price"/>
            </StackLayout>

            <StackLayout class="form">

                <StackLayout class="form_field">
                    <label class="title" text="Delivery address"/>
                    <label class="field_value" :text="shippingCache.deliveryAddressString"/>
                </StackLayout>

                <StackLayout class="form_field">
                    <label class="title" text="Delivery date"/>
                    <label class="field_value" :text="recap.deliveryDate"/>
                </StackLayout>
            
                <StackLayout class="form_field">
                    <label class="title" text="Delivery time"/>
                    <label class="field_value" :text="recap.deliveryTime"/>
                </StackLayout>

                <RadioButtonsGroup title="Payment method" :items="paymentMethods" v-model="paymentMethodIndex" />

            </StackLayout>
            
        </StackLayout>

        <GridLayout width="100%" height="100%" padding="10">
            <Ripple class="button" dock="bottom" verticalAlignment="bottom">
                <Button @tap="confirmButtonClick" :text="paymentMethodIndex ? 'Checkout' : 'Confirm order'" elevation="0" width="100%" padding="0"/>
            </Ripple>
        </GridLayout>

    </AbsoluteLayout>
</template>

<script>
import RadioButtonsGroup from '../../templates/form/RadioButtonsGroup';
import { mapState } from 'vuex';

export default {
    computed: mapState({
        orderData: state => state.cart.order,
        total: state => state.cart.total,
        shippingCache: state => state.pagesCache.cartShipping,
    }),
    components: {
        RadioButtonsGroup,
    },
    data: () => ({
        paymentMethods: [
            'Cash on delivery',
            'Credit Card/Net Banking'
        ],
        paymentMethodIndex: 1,
        recap: {
            deliveryDate: '',
            deliveryTime: '',
        },
        canConfirm: true,
    }),
    methods: {
        updateRecapData(){
            this.updateDeliveryDate();
            this.updateDeliveryTime();
        },
        updateDeliveryDate(){
            this.recap.deliveryDate = this.orderData.deliveryDate ? this.orderData.deliveryDate.toLocal() : '';
        },
        updateDeliveryTime(){
            this.recap.deliveryTime = this.$dynamicText('deliveryTime', this.orderData.deliveryTime);
        },

        confirmButtonClick(){
            if(this.paymentMethodIndex == 1){
                alert({
                    title: 'Cart',
                    message: 'Payment method "Credit Card/Net Banking" isn\'t available.',
                    okButtonText: 'OK',
                })
            }else{
                if(this.canConfirm){
                    this.canConfirm = false;
                    setTimeout(() => this.canConfirm = true, 500);
                    this.$emit('confirm');
                }
            }
        }
    },
    watch: {
        paymentMethodIndex(){
            this.orderData.paymentMethod = (this.paymentMethodIndex == 0) ? 'cod' : 'razor';
        },
        'orderData.deliveryDate': function(){
            this.updateDeliveryDate();
        },
        'orderData.deliveryTime': function(){
            this.updateDeliveryTime();
        }
    },

    mounted(){
        this.paymentMethodIndex = this.orderData.paymentMethod == 'cod' ? 0 : 1;
        this.updateRecapData();
    }
}
</script>


<style lang="scss" scoped>
@import '~/styles/vars';
.total{
    width: 100%;
    text-align: center;
    color: #444;
    padding: 20;
    background-color: white;
    border-color: #999;
    border-width: 0 0 0.5 0;
    .text{
        font-size: 16;
    }
    .value{
        font-size: 30;
    }
}
.form{
    padding: 10;
}
.button{
    height: 50;
    margin-top: 30;
    button{
        background-color: $primary-color;
        border-color: #fdfdfd;
        color: white;
        border-width: 1;
        border-radius: 4;
        font-size: 18;
    }
}

.title{
    font-size: 14;
    margin-bottom: 4;
}
.form_field{
    margin-bottom: 14;
    padding: 0;
    .field_value{
        font-size: 18;
        margin-bottom: 4;
        color: #444;
    }
}
</style>

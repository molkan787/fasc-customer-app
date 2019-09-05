<template>
    <Form verticalAlignment="top">
            
        <DropdownField title="Delivery address" first
            :items="addresses" v-model="formData.deliveryAddressIndex"
            @selectedIndexChanged="deliveryAddressChange">

            <SolidButton @tap="addAddressTap" text="Add new address" color="#777" width="100%"
                backgroundColor="#f8f8f8" radius="100" padding="10" fontSize="14" margin="10 0 6 0" boldText/>

        </DropdownField>

        <SelectDateField v-model="formData.deliveryDate" title="Delivery date"
            @changed="deliveryDateChanged" minDate="now"/>

        <FormField title="Delivery time" last>
            <check-box class="cb" boxType="circle" fillColor="#F36F24" color="#666" scaleX="1.1" scaleY="1.1"
                :text="$dynamicText('deliveryTime', 'regular')"
                :checked="formData.deliveryTime == 'regular'" @tap="deliveryTimeChange('regular')" />

            <check-box class="cb" boxType="circle" fillColor="#F36F24" color="#666" scaleX="1.1" scaleY="1.1"
                :text="$dynamicText('deliveryTime', 'fast')"
                :checked="formData.deliveryTime == 'fast'" @tap="deliveryTimeChange('fast')" />
        </FormField>

    </Form>
</template>

<script>
import Form from '../../templates/form/Form';
import FormField from '../../templates/form/FormField';
import DropdownField from '../../templates/form/DropdownField';
import SelectDateField from '../../templates/form/SelectDateField';
import { mapState, mapActions } from 'vuex';
import Helper from '~/logic/helper';

export default {
    components: {
        Form,
        FormField,
        DropdownField,
        SelectDateField,
    },
    computed: mapState({
        orderData: state => state.cart.order,
        cache: state => state.pagesCache.cartShipping,
        customerAddresses: state => state.customerAddresses,
    }),
    data: () => ({
        formData: {
            deliveryDate: null,
            deliveryTime: 'regular',
            deliveryAddressIndex: 0,
        },
        addresses: [],
    }),
    methods: {
        ...mapActions(['setCartDeliveryTime']),
        deliveryAddressChange(addrIndex){
            this.formData.deliveryAddressIndex = addrIndex;
            this.orderData.deliveryAddress = addrIndex;
            this.cache.deliveryAddressString = this.addresses[addrIndex];
        },
        deliveryDateChanged(){
            this.orderData.deliveryDate = this.formData.deliveryDate;
        },
        deliveryTimeChange(val){
            this.formData.deliveryTime = val;
            this.setCartDeliveryTime(val);
        },

        updateData(){
            this.formData.deliveryTime = this.orderData.deliveryTime;
            this.formData.deliveryDate = this.orderData.deliveryDate;
            this.formData.deliveryAddressIndex = this.orderData.deliveryAddress;
            this.cache.deliveryAddressString = this.addresses[this.orderData.deliveryAddress];
        },

        addAddressTap(){
            this.$goTo('addAddress', {
                redirect: {
                    name: 'cart',
                    params: {
                        step: 1
                    }
                },
                setToOrderData: true,
            });
        }
    },
    mounted(){
        for(let addr of this.customerAddresses){
            this.addresses.push(Helper.addressObjectToString(addr));
        }
        this.updateData();
    }
}
</script>

<style lang="scss" scoped>
.cb{
    margin-top: 8;
    margin-bottom: 12;
    margin-left: 10;
    font-size: 14;
}
</style>

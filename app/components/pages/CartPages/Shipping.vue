<template>
    <StackLayout class="root">
        <StackLayout class="form_field">
            <label class="title" text="Delivery address"/>
            <CardView elevation="2" class="field_input">
                <DropDown class="dropdown" :items="addresses" :selectedIndex="formData.deliveryAddressIndex" 
                @selectedIndexChange="deliveryAddressChange" hint="Select an address" ref="address" />
            </CardView>
            <Ripple class="button">
                <Button text="Add new address" @tap="addAddressTap" elevation="0" width="100%" padding="0"/>
            </Ripple>
        </StackLayout>

        <StackLayout class="form_field">
            <label class="title" text="Delivery date"/>
            <CardView elevation="2" class="field_input">
                <label class="dateInput" :class="formData.deliveryDate ? 'haveValue' : ''"
                    :text="formData.deliveryDate ? formData.deliveryDate : 'Select a date'"
                    @tap="selectDeliveryDate"/>
            </CardView>
        </StackLayout>
        
        <StackLayout class="form_field">
            <label class="title" text="Delivery time"/>

            <check-box class="cb" boxType="circle" fillColor="#F36F24" color="#666" scaleX="1.2" scaleY="1.2"
                :text="$dynamicText('deliveryTime', 'regular')"
                :checked="formData.deliveryTime == 'regular'" @tap="deliveryTimeChange('regular')" />

            <check-box class="cb" boxType="circle" fillColor="#F36F24" color="#666" scaleX="1.2" scaleY="1.2"
                :text="$dynamicText('deliveryTime', 'fast')"
                :checked="formData.deliveryTime == 'fast'" @tap="deliveryTimeChange('fast')" />

        </StackLayout>

    </StackLayout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Helper from '~/logic/helper';

export default {
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
        deliveryAddressChange(){
            const addrIndex = this.$refs.address.nativeView.selectedIndex;
            this.formData.deliveryAddressIndex = addrIndex;
            this.orderData.deliveryAddress = addrIndex;
            this.cache.deliveryAddressString = this.addresses[addrIndex];
        },
        selectDeliveryDate(){
            this.$selectDate().then(result => {
                this.formData.deliveryDate = result.toLocal();
                this.orderData.deliveryDate = result;
            })
            .catch(err => console.log(err))
        },
        deliveryTimeChange(val){
            this.formData.deliveryTime = val;
            this.setCartDeliveryTime(val);
        },

        updateData(){
            this.formData.deliveryTime = this.orderData.deliveryTime;
            this.formData.deliveryDate = this.orderData.deliveryDate ? this.orderData.deliveryDate.toLocal() : '';
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
.root{
    padding: 10;
    background-color: white;
}
.dropdown{
    font-size: 19;
    padding: 3;
    border-radius: 4;
}
.title{
    font-size: 14;
    margin-bottom: 4;
}
.button{
    margin-top: 10;
    button{
        background-color: #f5f5f5;
        border-color: #fdfdfd;
        border-width: 1;
        border-radius: 4;
    }
}

.form_field{
    margin-bottom: 14;
    padding: 0;
    .field_input{
        margin: 2;
    }
    .cb{
        margin-top: 6;
        margin-bottom: 14;
        margin-left: 30;
    }
}
.input{
    font-size: 19;
    padding: 6;
    background-color: white;
}
.dateInput{
    font-size: 19;
    padding: 6;
    background-color: white;
    color: #aaa;
    
    &.haveValue{
        color: #666;
    }
}
</style>

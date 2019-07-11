<template>
    <MPage title="Add new address" :loading="loading" backButton>
        <StackLayout padding="10" width="100%">
            <TextInputField title="Address 1" v-model="form.address_1" ref="address_1"/>
            <TextInputField title="Address 2" v-model="form.address_2"/>
            <TextInputField title="City" v-model="form.city" :disabled="true" />
            <SubmitButton @tap="addTap" text="Add"/>
        </StackLayout>
    </MPage>
</template>

<script>
import TextInputField from '../templates/form/TextInputField';
import SubmitButton from '../templates/form/SubmitButton';
import AccountLogic from '~/logic/account';
import { mapState } from 'vuex';

export default {
    components: {
        TextInputField,
        SubmitButton,
    },
    props: {
        redirect: {
            type: Object,
            default: null,
        },
        setToOrderData: {
            type: Boolean,
            default: false,
        }
    },
    computed: mapState(['cityNames', 'cart']),
    data: () => ({
        loading: false,
        form: {
            address_1: '',
            address_2: '',
            city: '',
        }
    }),
    methods: {
        addTap(){
            if(this.validateFormData()){
                this.loading = true;
                AccountLogic.addAddress(this.form)
                .then(addrIndex => {
                    this.$alert('The address was successfully added.').then(() => {
                        this.done(addrIndex);
                    })
                })
                .catch(err => {
                    this.$alert('Something went wrong, Please try again');
                })
                .finally(() => {
                    this.loading = false;
                });
            }
        },

        validateFormData(){
            if(this.form.address_1.length < 4){
                this.$alert('Please enter a valid address.');
                return false;
            }
            return true;
        },

        done(addrIndex){
            if(this.setToOrderData){
                this.cart.order.deliveryAddress = addrIndex;
            }
            if(this.redirect && this.redirect.name){
                const params = this.redirect.params || {};
                params.addrIndex = addrIndex;
                this.$goTo(this.redirect.name, params);
            }else{
                this.$goTo('account');
            }
        }
    },

    mounted(){
        this.form.city = this.cityNames[this.$langId()];
        this.$refs.address_1.nativeView.focus();
    }
}
</script>

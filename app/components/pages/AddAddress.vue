<template>
    <MPage title="Add new address" container="stack" :loading="loading" backButton backgroundColor="#fdfdfd">
        <Form width="100%" >
            <TextInputField title="Address 1" v-model="form.address_1" ref="address_1" first/>
            <TextInputField title="Address 2" v-model="form.address_2"/>
            <TextInputField title="City" v-model="form.city" :disabled="true" last/>
        </Form>
        <SubmitButton @tap="addTap" text="Add"/>
    </MPage>
</template>

<script>
import TextInputField from '../templates/form/TextInputField';
import SubmitButton from '../templates/form/SubmitButton';
import AccountLogic from '~/logic/account';
import Form from '../templates/form/Form';
import { mapState } from 'vuex';

export default {
    components: {
        TextInputField,
        SubmitButton,
        Form
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
            console.log(JSON.stringify(this.redirect))
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

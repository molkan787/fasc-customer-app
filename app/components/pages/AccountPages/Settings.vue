<template>
    <AbsoluteLayout width="100%" height="100%">
        <StackLayout width="100%">
            <Form>
                <ValueField title="Phone number" :value="formData.phone" first/>
                <TextInputField title="First name" v-model="formData.firstname" />
                <TextInputField title="Last name" v-model="formData.lastname" />
                <TextInputField title="Email" v-model="formData.email" last/>
            </Form>
            <SubmitButton text="Update" @tap="updateTap"/>
        </StackLayout>
        <Spinner v-if="loading" align backgroundColor="#90FFFFFF" />
    </AbsoluteLayout>
</template>

<script>
import Form from '../../templates/form/Form';
import ValueField from '../../templates/form/ValueField';
import TextInputField from '../../templates/form/TextInputField';
import SubmitButton from '../../templates/form/SubmitButton';
import AccountLogic from '~/logic/account';

export default {
    components: {
        Form,
        ValueField,
        TextInputField,
        SubmitButton
    },
    data: () => ({
        formData: {
            phone: '',
            firstname: '',
            lastname: '',
            email: '',
        },

        loading: false,
    }),

    methods: {
        updateTap(){
            if(!this.validateForm()) return;
            this.loading = true;
            AccountLogic.updateInfo(this.formData)
            .then(() => {
                this.$alert('Your data have been successfully updated.', 'Account');
            })
            .catch(err => {
                this.$alert('Something went wrong, We couldn\'t update your data.', 'Account');
            })
            .finally(() => {
                this.loading = false;
            })
        },

        validateForm(){
            const c = this.$customer();
            const f = this.formData;
            if(c.firstname == f.firstname && c.lastname == f.lastname && c.email == f.email){
                return;
            }
            if(this.formData.firstname.length < 2 || this.formData.lastname.length < 2){
                this.$alert('Please enter a valid first name & last name.', 'Account');
                return false;
            }
            return true;
        }
    },

    mounted(){
        const customer = this.$customer();
        if(!customer) return;
        this.formData.phone = customer.phone;
        this.formData.firstname = customer.firstname;
        this.formData.lastname = customer.lastname;
        this.formData.email = customer.email;
    }
}
</script>

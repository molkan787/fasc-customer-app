<template>
    <MPage backButton :title="title" :loading="loading" >
        <Pager width="100%" height="100%" :selectedIndex="currentPageIndex" disableSwipe="true">
            <PagerItem>
                <StackLayout>
                    <Form>
                        <TextInputField title="First name" v-model="register.firstname" first/>
                        <TextInputField title="Last name" v-model="register.lastname"/>
                        <TextInputField title="Phone number" v-model="register.telephone" keyboard="phone"/>
                        <TextInputField title="Email address" v-model="register.email" last/>
                    </Form>
                    <StackLayout padding="14">
                        <SolidButton @tap="registerTap" text="Register" color="white" backgroundColor="#F36F24" radius="50" padding="12"/>
                        <SolidButton @tap="openTab('login')" text="I am already registered" marginTop='10' backgroundColor="#f5f5f5" radius="50" padding="12"/>
                        <Image @tap="fbLogin" src="~/assets/images/login_with_fb.png" width="100%" marginTop="50"/>
                    </StackLayout>
                </StackLayout>
            </PagerItem>

            <PagerItem>
                <StackLayout>
                    <Form :shadowOpacity="0.05" shadowPadding="4 0 0 0">
                        <TextInputField title="Phone number" v-model="login.telephone" keyboard="phone" first last/>
                    </Form>
                    <StackLayout padding="14">
                        <SolidButton @tap="loginTap" text="Login" color="white" backgroundColor="#F36F24" radius="50" padding="12"/>
                        <SolidButton @tap="openTab('register')" text="I want to register" marginTop='10' backgroundColor="#f5f5f5" radius="50" padding="12"/>
                        <Image @tap="fbLogin" src="~/assets/images/login_with_fb.png" width="100%" marginTop="50"/>
                    </StackLayout>
                </StackLayout>
            </PagerItem>

            <PagerItem>
                <StackLayout>
                    <Form :shadowOpacity="0.15">
                        <FormField first>
                            <label class="verifyHeadText" :text='`We have sent you a verification code to ${verify.telephone}, Type it in the box below.`' textWrap="true"/>
                        </FormField>
                        <TextInputField last title="Verification code" hint="xxxxxx" v-model="verify.code" keyboard="number"/>
                    </Form>
                    <StackLayout padding="14">
                        <SolidButton @tap="verifyTap" text="Verify" color="white" backgroundColor="#F36F24" radius="50" padding="12"/>
                    </StackLayout>
                </StackLayout>
            </PagerItem>
        </Pager>
    </MPage>
</template>

<script>
import Form from '../templates/form/Form';
import FormField from '../templates/form/FormField';
import TextInputField from '../templates/form/TextInputField';
import Account from '~/logic/account';

export default {
    components: {
        Form,
        FormField,
        TextInputField,
    },
    props: {
        tab: {
            type: String,
            default: 'register'
        },
        redirect: {
            type: Object,
            default: null,
        }
    },
    data: () => ({
        loading: false,
        title: 'Account',
        currentPageIndex: 0,
        register: {
            firstname: '',
            lastname: '',
            telephone: '',
            email: '',
        },
        login: {
            telephone: '',
        },
        verify: {
            telephone: '',
            token: '',
            code: '',
        }
    }),
    methods: {
        registerTap(){
            if(!this.validateFormData('register')) return;
            this.loading = true;
            Account.register(this.register)
            .then(resp => {
                this.verify.token = resp.token;
                this.verify.telephone = resp.telephone;
                this.openTab('verify');
            })
            .catch(err => {
                if(err == 'phone_exist'){
                    this.msg('This phone number is already registered, Try to login instead.')
                }else{
                    this.msg('We could not register you, Please try again.')
                }
            })
            .finally(() => {
                this.loading = false;
            });
        },
        loginTap(){
            if(!this.validateFormData('login')) return;
            this.loading = true;
            Account.login(this.login)
            .then(resp => {
                this.verify.token = resp.token;
                this.verify.telephone = resp.telephone;
                this.openTab('verify');
            })
            .catch(err => {
                if(err == 'customer_not_found'){
                    this.msg('This phone number is not registered, Try to register instead.')
                }else{
                    this.msg('We could not login you, Please try again.')
                }
            })
            .finally(() => {
                this.loading = false;
            });
        },
        verifyTap(){
            if(!this.validateFormData('verify')) return;
            this.loading = true;
            Account.verify(this.verify)
            .then(resp => {
                this.loginSuccess();
            })
            .catch(err => {
                console.log('Error:', err);
                if(err == 'invalid_code'){
                    this.msg('Invalid verification code, Please try again.');
                }else{
                    this.msg('We could not verify your phone number, Please try again.');
                }
            })
            .finally(() => {
                this.loading = false;
            });
        },

        fbLogin(){
            this.loading = true;
            Account.fbLogin().then(() => {
                this.loginSuccess();
            })
            .catch(err => {
                this.msg('Something went wrong, Please try again.');
            })
            .finally(() => {
                this.loading = false;
            });
        },

        loginSuccess(){
            this.msg('You have been successfully logged in.').then(() => {
                if(this.redirect && this.redirect.name){
                    this.$goTo(this.redirect.name);
                }else{
                    this.$goTo('home');
                }
            });
        },

        validateFormData(dataName){
            const data = this[dataName];
            if(dataName == 'register'){
                if(data.firstname.length < 2 || data.lastname.length < 2)
                    this.msg('Please enter a valid first & last name.');
                else if(data.telephone.length != 10)
                    this.msg('Please enter a valid 10 digit phone number.');
                else
                    return true;
            }else if(dataName == 'login'){
                if(data.telephone.length != 10)
                    this.msg('Please enter a valid 10 digit phone number.');
                else
                    return true;
            }else if(dataName == 'verify'){
                if(data.code.length != 6)
                    this.msg('Please enter a valid 6 digit verification code.');
                else
                    return true;
            }
            return false;
        },

        msg(text){
            return alert({
                title: 'Account',
                message: text,
                okButtonText: 'OK',
            })
        },
        openTab(tab){
            switch (tab) {
                case 'register':
                    this.currentPageIndex = 0;
                    this.title = 'Register';
                    break;
                case 'login':
                    this.currentPageIndex = 1;
                    this.title = 'Login';
                    break;
                case 'verify':
                    this.currentPageIndex = 2;
                    this.title = 'Verification';
                    break;
            
                default:
                    this.currentPageIndex = 0;
                    this.title = 'Register';
                    break;
            }
        }
    },

    mounted(){
        this.openTab(this.tab);
    }
}
</script>

<style lang="scss" scoped>
.verifyHeadText{
    font-size: 17;
    margin-top: 10;
    margin-bottom: 20;
    text-align: center;
}
</style>

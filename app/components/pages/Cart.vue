<template>
    <MPage title="My Cart" :backButton="true" :loading="loading" backgroundColor="#fdfdfd">
        <DockLayout stretchLastChild="true" width="100%" height="100%" class="root">

            <GridLayout dock="top" class="header" padding="0" height="46" :visibility="currentPageIndex > 2 ? 'collapsed' : 'visible'">
                <SolidButton class="backButton" width="50%" :text="currentPageIndex ? 'Back' : 'Back to Shopping'" fontSize="18" @tap="backTap"/>
                <SolidButton class="continueButton" width="50%" text="Continue" fontSize="18" @tap="continueTap" :visibility="currentPageIndex > 1 ? 'collapsed' : 'visible'"/>
            </GridLayout>

            <AbsoluteLayout dock="top" height="100%" class="pages">

                <Pager width="100%" height="100%" :selectedIndex="currentPageIndex" disableSwipe="true">
                    <PagerItem>
                        <CartItems />
                    </PagerItem>
                    <PagerItem>
                        <Shipping />
                    </PagerItem>
                    <PagerItem>
                        <Payment @confirm="submitOrder" />
                    </PagerItem>
                    <PagerItem>
                        <Finished :orderId="lastOrderId" />
                    </PagerItem>
                </Pager>

                <ShadowBar size="3" opacity="0.2"/>

                <DockLayout class="footer_par" height="100%" width="100%" :visibility="currentPageIndex > 1 ? 'collapsed' : 'visible'">
                    <CardView dock="bottom" class="footer" height="46" width="100%" elevation="20">
                        <GridLayout width="100%">
                            <label class="total" :text="'Total: ' + totalAsText" @tap="totalTap" :class="(total > 0 ? 'highlight ' : '') + (currentPageIndex ? 'relax' : '')" />
                            <SolidButton v-if="currentPageIndex == 0" class="clearButton" text="Clear cart" fontSize="19" width="50%" @tap="clearTap"/>
                        </GridLayout>
                    </CardView>
                </DockLayout>

            </AbsoluteLayout>

        </DockLayout>
    </MPage>
</template>

<script>
import CartItems from './CartPages/CartItems';
import Shipping from './CartPages/Shipping';
import Payment from './CartPages/Payment';
import Finished from './CartPages/Finished';
import { mapState, mapActions } from 'vuex';
import CartLogic from '~/logic/cart';

export default {
    components: {
        CartItems,
        Shipping,
        Payment,
        Finished,
    },
    props: {
        step: {
            type: Number,
            default: 0,
        }
    },
    data: () => ({
        loading: false,
        currentPageIndex: 0,
        totalAsText: '0.00 \u20B9',
        lastOrderId: 0,
    }),
    computed: mapState({
        total: state => state.cart.total,
        cartCount: state => state.cart.count,
    }),
    watch: {
        total(){
            this.updateTotalText();
        }
    },
    methods: {
        ...mapActions(['clearCart']),
        backTap(){
            if(this.currentPageIndex == 0){
                this.$goTo('home');
            }else{
                this.currentPageIndex--;
            }
        },
        continueTap(){
            if(this.currentPageIndex == 0 && !this.$customer()){
                confirm({
                    title: this.$getStaticData('companyName'),
                    message: 'Please login or register before placing an order, Do you want to login now?',
                    okButtonText: 'Yes',
                    cancelButtonText: 'No',
                }).then(result => {
                    if(result){
                        this.$goTo('login', {tab: 'login', redirect: {name: 'cart'}})
                    }
                })
                return;
            }
            if(this.currentPageIndex < 2){
                if(this.validateFormData(this.currentPageIndex)){
                    this.currentPageIndex++;
                }
            }
        },
        clearTap(){
            if(this.cartCount < 1) return;
            confirm({
                title: 'Confirm',
                message: 'Are you sure you want to clear your cart?',
                okButtonText: 'Yes',
                cancelButtonText: 'No',
            })
            .then(result => { if(result) { this.clearCart(); } } );
        },
        totalTap(){},

        updateTotalText(){
            this.totalAsText = this.$options.filters.price(this.total);
        },

        validateFormData(step){
           const isValid = CartLogic.validateFormData(step); 
           if(!isValid){
               const msg = this.currentPageIndex ? 'Please fill all fields' : this.$dynamicText('minTotalMsg');
               alert({
                    title: 'Cart',
                    message: msg,
                    okButtonText: 'OK',
                })
           }
           return isValid;
        },
        submitOrder(){
            this.loading = true;
            CartLogic.postOrder()
            .then(data => {
                this.lastOrderId = data.order_id;
                this.currentPageIndex = 3;
            })
            .catch(err => {
                this.$alert('We could not place your order, Please try again.', 'Card');
                console.log(err)
            })
            .finally(() => this.loading = false);
        }
    },

    mounted(){
        this.updateTotalText();
        this.currentPageIndex = this.step;
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/vars';

.header{
    width: 100%;
    background-color: white;
    .backButton{
        horizontal-alignment: left;
    }
    .continueButton{
        horizontal-alignment: right;
        color: $primary-color;
    }
}
.footer_par{
    height: 100%;
    padding-top: 0;
    background-color: transparent;
}
.footer{
    margin-top: 0%;
    vertical-alignment: bottom;
    background-color: white;
    .total{
        width: 50%;
        font-size: 20;
        padding: 8;
        font-weight: normal;
        text-align: center;
        color: #777;
        horizontal-alignment: left;
        &.highlight{
            color: $primary-color;
        }
        &.relax{
            width: 100%;
        }
    }
    .clearButton{
        padding: 8;
        horizontal-alignment: right;
    }
}
.pages{
    width: 100%;
}
</style>

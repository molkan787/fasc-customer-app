<template>
    <CardView margin="2" elevation="3" radius="6" width="98%" height="100" class="root" ref="rootPanel" ripple="true" @tap="tapped" >
        <AbsoluteLayout height="100" class="subRoot">
            <Image class="picmin" :src="data.image"/>
            <label class="title" :text="data.title"></label>
            <Image v-if="showCartTools" class="removeButton" src="~/assets/icons/close_black.png" @tap="removeButtonTapped"/>
            <label class="spf" v-if="parseInt(data.spf)" :text="data.spf + ' ' + data.spf_unit"/>

            <template v-if="discounted">
                <Image class="promoImg" src="~/assets/icons/pstart_small.png"/>
                <label class="promoLbl" :text="discountText"></label>
            </template>
            
            <GridLayout rows="auto" columns="*" class="ctrl_con">
                <label class="priceLabel" :class="discounted ? 'promo' : ''" :text="getFinalPrice() | price" row="0" horizontalAlignment="left"/>
                <label v-if="discounted" class="oldPriceLabel" :text="data.price | price" row="0" horizontalAlignment="left"/>
                <AddToCartButton @tap="tapped2" :quantity="data.quantity" @changed="updateCartCount()" v-model="counts[data.product_id]" class="btn_add"  row="0" horizontalAlignment="right"/>
            </GridLayout>
        </AbsoluteLayout>
    </CardView>
</template>

<script>
import Helper from '~/logic/helper';
import AddToCartButton from './AddToCartButton';
import { mapState, mapActions } from 'vuex';
export default {
    components: {
        AddToCartButton
    },
    props: {
        data: {
            type: Object,
            default: () => {},
        },
        showCartTools: {
            type: Boolean,
            default: false,
        }
    },
    data: () => ({
        count: 0,
        discounted: false,
        discountText: '',

        cancelNextTap: false,
    }),
    computed: mapState({
        counts: state => state.cart.counts,
    }),
    methods: {
        ...mapActions(['updateCartCount']),
        tapped(){
            if(this.cancelNextTap){
                this.cancelNextTap = false;
                return;
            }
            this.$emit('tap');
        },
        tapped2(){
            this.cancelNextTap = true;
        },
        removeButtonTapped(){
            this.cancelNextTap = true;
            this.removeItem();
        },

        removeItem(){
            this.counts[this.data.product_id] = 0;
            this.updateCartCount();
        },
        reveal(){
            this.$refs.rootPanel.nativeView
            .animate({
                opacity: 1,
                duration: 500
            });
        },
        getFinalPrice(){
            return Helper.getFinalPrice(this.data);
        }
    },
    created(){
        const da = parseFloat(this.data.discount_amt);
        const dt = parseInt(this.data.discount_type);
        if(da && dt){
            this.discountText = '-' + da + (dt == 2 ? '\u20B9' : '%');
            this.discounted = true;
        }
        // setTimeout(() => this.reveal(), this.revealDelay + 1);
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/vars';
$h: 100;
$pad: 6;
.root{
    // opacity: 0;
    border-radius: 5;
    .subRoot{
        background-color: white;
        Image.picmin{
            $iw: $h;
            width: $iw;
            height: $iw;
        }
        label.title{
            margin-left: $h;
            margin-top: 4;
            font-size: 18;
            width: 66%;
        }
        label.spf{
            margin-left: $h;
            margin-top: 24;
            font-size: 16;
            color: #888;
        }
        Image.removeButton{
            width: 6%;
            margin: 4 0 0 93%;
            opacity: 0.5;
        }
    }
}
.ctrl_con{
    width: 100%;
    height: 54;
    margin-top: $h - 54;
    padding-right: $pad;
    padding-left: $h;
}
.btn_add{
    margin-top: 14;
}
.oldPriceLabel{
    font-size: 16;
    color: #777;
    text-decoration: line-through;
}
.priceLabel{
    font-size: 20;
    margin-top: 18;
    color: #555;
    &.promo{
        color: $primary-color;
    }
}

$pw: 50;
$pX: $h - $pw;
$pY: $h - $pw;
.promoImg{
    margin-top: $pY;
    margin-left: $pX;
    width: $pw;
    height: $pw;
}
.promoLbl{
    margin-top: $pY;
    margin-left: $pX;
    width: $pw;
    height: $pw;
    color: white;
    font-size: 16;
    font-weight: bold;
    text-align: center;
    padding-top: ($pw - 22) / 2;
    rotate: -35deg;
}
</style>

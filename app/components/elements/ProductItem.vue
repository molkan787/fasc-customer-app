<template>
    <CardView margin="2" elevation="0" radius="6" width="98%" height="100" class="root" ref="rootPanel" ripple="true" @tap="tapped" >
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
                <Image class="favBtn" :src="`~/assets/icons/heart_${data.in_wishlist ? 'highlighted' : 'simple'}.png`" @tap="fabButtonTappped"  row="0" horizontalAlignment="right"/>
                <AddToCartButton @tap="tapped2" :quantity="data.quantity" @changed="updateCartCount()" v-model="counts[data.product_id]" class="btn_add"  row="0" horizontalAlignment="right"/>
            </GridLayout>

        </AbsoluteLayout>
    </CardView>
</template>

<script>
import Helper from '~/logic/helper';
import AddToCartButton from './AddToCartButton';
import { mapState, mapActions } from 'vuex';
import DM from '~/struct/dm';
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
        fabButtonTappped(){
            this.cancelNextTap = true;
            this.toggleFavorite();
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
        },

        toggleFavorite(){
            this.data.in_wishlist = !this.data.in_wishlist;
            DM.setFavoriteState(this.data.product_id, this.data.in_wishlist)
            .catch(err => console.log('FavoriteLogic.setState:', err));
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
            font-size: 16;
            width: 66%;
        }
        label.spf{
            margin-left: $h;
            margin-top: 24;
            font-size: 14;
            color: #888;
        }
        Image.removeButton{
            width: 6%;
            margin: 4 0 0 93%;
            opacity: 0.4;
        }
    }
}
.ctrl_con{
    width: 100%;
    height: 48;
    margin-top: $h - 48;
    padding-right: $pad;
    padding-left: $h + 4;
}
.btn_add{
    margin-top: 8;
}
.favBtn{
    width: 30;
    height: 30;
    margin-top: 10;
    margin-right: 105;
    padding: 4;
    background-color: white;
}
.oldPriceLabel{
    font-size: 15;
    color: #777;
    text-decoration: line-through;
}
.priceLabel{
    font-size: 18;
    margin-top: 18;
    color: #555;
    &.promo{
        color: $primary-color;
    }
}

$pw: 50;
$pX: 0;
$pY: 0;
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
    font-size: 14;
    font-weight: bold;
    text-align: center;
    padding-top: ($pw - 18) / 2;
    rotate: -35deg;
}
</style>

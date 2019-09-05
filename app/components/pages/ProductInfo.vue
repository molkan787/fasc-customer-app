<template>
    <Page actionBarHidden="true" :width="myWidth" >
        <GridLayout height="100%" width="100%">
            <ScrollView height="100%">
                <StackLayout>
                    <GridLayout class="root" width="100%" :height="CarouselHeight" ref="images" margin="0">
                        <Carousel height="100%" width="100%" indicatorOffset="0,-10" ref="carousel"
                            indicatorColor="#ffffff" indicatorColorUnselected="#ffffff"
                            finite="true" bounce="false"
                            showIndicator="true" verticalAlignment="top"
                            android:indicatorAnimation="fill" color="white">

                            <CarouselItem v-for="(image, index) in images" :key="index" backgroundColor="#00000000" verticalAlignment="middle">
                                <Image :src="image" stretch="aspectFill" class="itemImage"/>
                            </CarouselItem>

                        </Carousel>
                        <Spinner v-if="loading" align backgroundColor="#99ffffff"/>
                    </GridLayout>

                    <GridLayout class="atcb_con" height="35" width="204" horizontalAlignment="right">
                        <CircleButton size="34" margin="12" @tap="share" horizontalAlignment="left">
                            <Image src="~/assets/icons/share_black.png" height="23" margin="5 7 9 9"/>
                        </CircleButton>
                        <CircleButton size="34" margin="12 12 12 52" @tap="toggleFavorite" horizontalAlignment="left">
                            <Image :src="`~/assets/icons/heart_${initialData.in_wishlist ? 'highlighted' : 'simple'}.png`" height="23" margin="7 5 5 5"/>
                        </CircleButton>
                        <AddToCartButton class="atcb" shadowSize="5" scaleX="1.1" scaleY="1.1" horizontalAlignment="right"
                            @changed="updateCartCount()" v-model="counts[pid]" :quantity="quantity" />
                    </GridLayout>

                    <StackLayout class="prices" :class="discounted ? 'discounted' : ''">
                        <label class="oldPrice" :text="oldPrice | price" v-if="discounted"></label>
                        <label class="price" :text="fPrice | price" :class="discounted ? 'discounted' : ''"></label>
                    </StackLayout>

                    <Spinner v-if="loading" align marginTop="60"/>
                    <template v-else>
                        <label class="desc_title" width="100%" textWrap="true" :text="title" />
                        <label class="description" textWrap="true" width="100%" :text="description"/>
                    </template>

                </StackLayout>
            </ScrollView>

            <GridLayout width="100%" height="100" verticalAlignment="top">
                <AbsoluteLayout class="promo" v-if="discounted" horizontalAlignment="left" verticalAlignment="top">
                    <Image src="~/assets/icons/pstart_big.png"/>
                    <label :text="discountText"/>
                </AbsoluteLayout>
                <CircleButton size="30" margin="12" @tap="goBack" horizontalAlignment="right" verticalAlignment="top">
                    <Image src="~/assets/icons/close_lines.png" height="16" margin="7" opacity="0.2"/>
                </CircleButton>
            </GridLayout>

        </GridLayout>
    </Page>
</template>

<script>
import AddToCartButton from '../elements/AddToCartButton';
import Helper from '~/logic/helper';
import { mapState, mapActions } from 'vuex';
import DM from '~/struct/dm';
const SocialShare = require("nativescript-social-share");

export default {
    components: {
        AddToCartButton,
    },
    props: {
        initialData: {
            type: Object,
            default: () => ({}),
        }
    },
    computed: mapState({
        counts: state => state.cart.counts,
    }),
    data: () => ({
        myWidth: null,
        loading: false,
        CarouselHeight: 0,
        images: [],
        count: 0,
        discounted: true,
        discountText: '',
        title: '',
        oldPrice: 0,
        fPrice: 0,
        pid: 0,
        description: '',
        quantity: '0',
    }),
    methods: {
        ...mapActions(['updateCartCount']),
        update(){
            this.loading = true;
            const data = this.initialData;
            const da = parseFloat(data.discount_amt);
            const dt = parseInt(data.discount_type);
            if(da && dt){
                this.discountText = '-' + da + (dt == 2 ? '\u20B9' : '%');
                this.discounted = true;
            }else{
                this.discounted = false;
            }
            this.images = [data.image];
            this.title = data.title;
            this.oldPrice = data.price;
            this.fPrice = Helper.getFinalPrice(data);
            this.pid = data.product_id;
            this.quantity = data.quantity;

            this.loadAdditionalData();
        },
        loadAdditionalData(){
            this.$dm.loadProduct(this.pid).then(data => {
                this.quantity = data.quantity;
                const d = data.d[this.$langId()] || {};
                this.title = d.name;
                this.description = d.description;
                this.images = [data.image];
                this.oldPrice = data.price;
                this.fPrice = Helper.getFinalPrice(data);
                this.loading = false;
                this.$nextTick(() => {
                    try {
                        this.$refs.carousel.nativeView.refresh();
                    } catch (error) {
                    }
                });
            });
        },
        toggleFavorite(){
            this.initialData.in_wishlist = !this.initialData.in_wishlist;
            DM.setFavoriteState(this.initialData.product_id, this.initialData.in_wishlist)
            .catch(err => console.log('FavoriteLogic.setState:', err));
        },

        share(){
            let text = 'WalkOn Retail\n' + this.initialData.title + '\n';
            text += 'https://open.walkonretail.com/p/' +  this.initialData.product_id;
            SocialShare.shareText(text);
        },

        goBack(){
            this.$modal.close();
        },
    },

    created(){
        const w = this.$getViewSize().width * 0.9;
        this.CarouselHeight = w;
        this.myWidth = w;
    },

    mounted(){
        try {
            this.update();
        } catch (error) {
            console.log(error)
        }
        this.$vRouter.setOneTimeBackHandler(() => this.goBack());
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/vars';
.atcb_con{
    margin: -22 8 0 0;
}
.atcb{
    margin-right: 6;
}
.title{
    font-size: 18;
    color: white;
    padding: 4;
    font-weight: normal;
    text-shadow: 0 0 2 black;
    margin-top: 4;
}
.promo{
    horizontal-alignment: left;
    width: 80;
    height: 80;
    margin-top: 0;
    Image{
        width: 100%;
        height: 100%;
    }
    label{
        color: white;
        font-size: 18;
        font-weight: bold;
        margin-top: 27;
        width: 100%;
        text-align: center;
        rotate: -35deg;
    }
}
.oldPrice{
    color: #888;
    text-decoration: line-through;
    font-size: 15;
}
.price{
    font-size: 22;
    font-weight: bold;
    color: #333;
    &.discounted{
        color: $primary-color;
    }
}
.prices{
    width: 100%;
    text-align: left;
    margin-top: -10;
    padding-left: 14;
}
.desc_title{
    padding: 14;
    font-size: 19;
    font-weight: bold;
    padding-bottom: 0;
}
.description{
    padding: 14;
    font-size: 15;
}
</style>

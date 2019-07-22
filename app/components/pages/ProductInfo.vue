<template>
    <MPage :actionBar="false" container="none" :width="myWidth">
        <GridLayout>
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
                    <!-- <ShadowBar width="100%" opacity="0.1" :size="5"/> -->
                    <AddToCartButton class="atcb" shadowSize="5" scaleX="1.2" scaleY="1.2" horizontalAlignment="right"
                        @changed="updateCartCount()" v-model="counts[pid]" :quantity="quantity" />
                    
                    <AbsoluteLayout class="promo" v-if="discounted">
                        <Image src="~/assets/icons/pstart_big.png"/>
                        <label text="-50%"/>
                    </AbsoluteLayout>

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

            <!-- <ShadowBar width="100%" opacity="0.8" :size="50" verticalAlignment="top"/> -->
            <AbsoluteLayout height="50" verticalAlignment="top" padding="5">
                <!-- <ShadowedLabel class="title" :text="title" marginLeft="40" /> -->
                <CircleButton size="30" margin="7" @tap="goBack">
                    <Image src="~/assets/icons/arrow_left.png" height="16" margin="7" opacity="0.2"/>
                </CircleButton>
            </AbsoluteLayout>

        </GridLayout>
    </MPage>
</template>

<script>
import AddToCartButton from '../elements/AddToCartButton';
import Helper from '~/logic/helper';
import { mapState, mapActions } from 'vuex';

export default {
    components: {
        AddToCartButton,
    },
    props: {
        initialData: {
            type: Object,
            required: false,
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
                // this.images = [data.image, ...data.images];
                this.loading = false;
                this.$nextTick(() => {
                    this.$refs.carousel.nativeView.refresh();
                });
            });
        },
        goBack(){
            this.$modal.close();
        },
    },

    created(){
        const w = this.$getViewSize().width * 0.9;
        this.CarouselHeight = w;
        this.myWidth = w;

        this.images.push('http://169.254.80.80/image/cache/catalog/Products/62baec6a4c187dbfa6fecf8e50db7c83-250x250.jpg')
        this.images.push('http://169.254.80.80/image/cache/catalog/Products/86d6ee45e704c61e271c59c8a960f6fd-200x200.jpg')
    },

    mounted(){
        this.update();
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/vars';
.atcb{
    margin: -22 15 0 0;
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
    width: 100;
    height: 100;
    margin-top: -65;
    Image{
        width: 100%;
        height: 100%;
    }
    label{
        color: white;
        font-size: 24;
        font-weight: bold;
        margin-top: 31;
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
    font-size: 24;
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
    &.discounted{
        margin-top: -50;
        text-align: center;
        padding-right: 26;
    }
}
.desc_title{
    padding: 14;
    font-size: 20;
    font-weight: bold;
    padding-bottom: 0;
}
.description{
    padding: 14;
    font-size: 16;
}
</style>

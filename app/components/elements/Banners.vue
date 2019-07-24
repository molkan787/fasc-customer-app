<template>
    <GridLayout class="root" :height="rootHeight" width="100%" scaleX="0.95" scaleY="0.95">
            <Carousel height="100%" width="100%" indicatorOffset="0,20"
                @pageChanged="bannerChanged"
                indicatorColor="#ffffff" indicatorColorUnselected="#ffffff"
                finite="true" bounce="false"
                showIndicator="true" verticalAlignment="top"
                android:indicatorAnimation="fill" color="white"
                :selectedPage="selectedPage">

                <CarouselItem v-for="item in items" :key="item.id" @tap="bannerTaped(item)"
                    :id="`banner${item.id}`" backgroundColor="#00000000" verticalAlignment="middle">
                    <Image :src="item.image" stretch="fill" class="itemImage"/>
                </CarouselItem>

            </Carousel>
    </GridLayout>
</template>

<script>
export default {
    props: {
        items:{
            type: Array,
            default: () => [],
        }
    },
    data(){
        return {
            rootHeight: 100,
            selectedPage: 0,
            slideTimer: 0,
        }
    },
    methods:{
        slide(){
            if(this.selectedPage >= this.items.length - 1){
                this.selectedPage = 0;
            }else{
                this.selectedPage++;
            }
        },
        resetSlideTimer(){
            clearInterval(this.slideTimer);
            this.slideTimer = setInterval(() => { this.slide() }, 3000);
        },
        bannerChanged(args){
            this.selectedPage = args.index;
            this.resetSlideTimer();
        },
        bannerTaped(banner){
            if(banner.link.replace(/\s/g, '')){
                this.$goTo('customerProductsLost', { ids: banner.link });
            }
        }
    },
    created(){
        this.rootHeight = (this.$getViewSize().width) * 0.4;
        this.resetSlideTimer();
    }
}
</script>


<style lang="scss" scoped>
.root{
    width: 100%;
    padding: 4;
    background-color: white;
}
.itemImage{
    width: 100%;
    height: 100%;
    border-radius: 6;
}
</style>

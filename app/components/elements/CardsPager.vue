<template>
    <GridLayout :rows="cardsSize" :columns="cardsSize" width="100%" padding="10" ref="root">
        <Card @tap="cardTapped(0)" row="0" col="0" contentPadding="12" shadowOpacity="0.05" width="100%" innerPadding="25" container="grid" ripple>
            <Image class="card_icon" :src="'~/assets/icons/' + items[0].icon + '.png'"/>
            <label class="card_text" :text="items[0].text"/>
        </Card>
        <Card @tap="cardTapped(1)" row="0" col="1" contentPadding="12" shadowOpacity="0.05" innerPadding="25" container="grid" ripple>
            <Image class="card_icon" :src="'~/assets/icons/' + items[1].icon + '.png'"/>
            <label class="card_text" :text="items[1].text"/>
        </Card>
        <Card @tap="cardTapped(2)" row="1" col="0" contentPadding="12" shadowOpacity="0.05" innerPadding="25" container="grid" ripple>
            <Image class="card_icon" :src="'~/assets/icons/' + items[2].icon + '.png'"/>
            <label class="card_text" :text="items[2].text"/>
        </Card>
        <Card @tap="cardTapped(3)" row="1" col="1" contentPadding="12" shadowOpacity="0.05" innerPadding="25" container="grid" ripple>
            <Image class="card_icon" :src="'~/assets/icons/' + items[3].icon + '.png'"/>
            <label class="card_text" :text="items[3].text"/>
        </Card>
    </GridLayout>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: null,
        }
    },
    data: () => ({
        cardsSize: '',
    }),
    methods: {
        updateCardsSize(){
            try {
                const tw = this.$refs.root.nativeView.getActualSize().width;
                const htw = (tw - 20) / 2;
                this.cardsSize = htw + ',' + htw;
            } catch (error) {
                
            }
        },

        cardTapped(index){
            const item = this.items[index];
            this.$emit('tapped', item.name || index);
        }
    },

    mounted(){
        const fun = () => {
            const root = this.$refs.root.nativeView;
            root.on("layoutChanged", () => {
                setTimeout(() => this.updateCardsSize(), 100);
            })
        };
        try {
            fun();
        } catch (error) {
            sleep(300);
            try {
                fun();
            } catch (error) {
                
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card_icon{
    width: 45;
    height: 45;
    vertical-alignment: top;
    horizontal-alignment: left;
}
.card_text{
    vertical-alignment: bottom;
    horizontal-alignment: right;
    font-size: 15;
    color: #222;
}
</style>

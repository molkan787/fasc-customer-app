<template>
    <CardView class="root" :class="qty < 1 ? 'ofs' : ''" radius="32" width="100" height="32" elevation="0" ripple="true" @tap="rootTap"> <!-- qty > 0 ? shadowSize : 0 -->
        <template v-if="qty < 1">
            <label text="OUT OF STOCK" class="ofs" />
        </template>
        <template v-else-if="!value">
            <label text="ADD" />
        </template>
        <GridLayout v-else class="ctrls" rows="auto" columns="*">
            <Image row="0" horizontalAlignment="left" @tap="updateCount(-1)" src="~/assets/icons/minus_white.png" />
            <label row="0" horizontalAlignment="center" :text="value"/>
            <Image row="0" horizontalAlignment="right" @tap="updateCount(1)" src="~/assets/icons/plus_white.png" />
        </GridLayout>
    </CardView>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            default: 0,
        },
        quantity: {
            default: '0'
        },
        shadowSize: {
            default: 3,
        }
    },
    watch: {
        quantity(){
            this.updateQty();
        }
    },
    data: () => ({
        qty: 0,
    }),
    methods: {
        updateQty(){
            this.qty = parseInt(this.quantity);
        },
        rootTap(){
            this.$emit('tap');
            this.updateCount(1, true);
        },
        updateCount(amt, onlyIfZero){
            if(amt > 0 && this.value >= this.qty) return;
            if(onlyIfZero && this.value > 0) return;
            let newVal = this.value + amt;
            if(newVal < 0) newVal = 0;
            this.$emit('input', newVal);
            this.$emit('changed', newVal);
        }
    },
    mounted(){
        this.updateQty();
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/vars';
.root{
    border-radius: 500;
    label{
        background-color: $primary-color;
        color: white;
        border-color: $primary-color;
        border-radius: 50%;
        height: 32;
        padding: 0;
        text-align: center;
        padding: 6;
        &.ofs{
            background-color: white;
        }
    }
}
.ctrls{
    width: 100%;
    background-color: $primary-color;
    Image{
        border-radius: 50%;
        padding: 10;
        width: 32;
        height: 32;
    }
    label{
        font-size: 17;
        font-weight: bold;
        margin-top: -4;
        color: white;
    }
}
label.ofs{
    margin-top: 2;
    font-size: 12;
    color: $red;
}
</style>

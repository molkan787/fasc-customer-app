<template>
    <AbsoluteLayout class="root" @tap="rootTapped">
        <Image :src="icon" />
        <label v-if="count > 0" :text="count"></label>
    </AbsoluteLayout>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: '',
        },
        count: {
            type: Number,
            default: 0,
        }
    },
    methods: {
        rootTapped(){
            this.$emit('tap');
        }
    }
}
</script>


<style lang="scss" scoped>
$w: 36;
$pad: 8;
.root{
    height: $w;
    width: $w;
    margin-left: 10;
    Image{
        $iw: $w - $pad * 2;
        width: $iw;
        height: $iw;
        opacity: 0.2;
        margin: $pad 0 0 $pad;
    }
    label{
        $lw: 16;
        background-color: red;
        width: $lw;
        height: $lw;
        color: white;
        border-radius: 50%;
        text-align: center;
        font-size: 11;
        font-weight: bold;
        // margin: -4 0 0 -4;
    }
}
</style>

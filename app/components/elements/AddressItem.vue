<template>
    <GridLayout class="root" width="100%">
        <label horizontalAlignment="left" :text="addr"/>
        <Image horizontalAlignment="right" src="~/assets/icons/close_black.png" @tap="deleteTapped"/>
    </GridLayout>
</template>

<script>
import Helper from '~/logic/helper';
export default {
    props: {
        data: {
            type: Object,
            default: () => ({}),
        }
    },
    data: () => ({
        addr: '',
    }),
    methods: {
        deleteTapped(){
            this.$emit('deleteTap', this.data);
        }
    },
    mounted(){
        this.addr = Helper.addressObjectToString(this.data);
    }
}
</script>

<style lang="scss" scoped>
$h: 40;
.root{
    width: 100%;
    height: $h;
    padding: 4;
    margin-bottom: 8;
    Image{
        $ih: 24;
        height: $ih;
        width: $ih;
        margin-top: ($h - $ih) / 2;
        opacity: 0.2;
    }
    label{
        font-size: 18;
        color: #444;
    }
}
</style>

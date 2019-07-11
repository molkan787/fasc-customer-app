<template>
    <Ripple class="root" width="140" @tap="tap">
        <AbsoluteLayout>
                <label :text="data.name"/>
                <Image :src="data.image"/>
        </AbsoluteLayout>
    </Ripple>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {},
        }
    },
    methods: {
        tap(){
            this.$emit('tap', this.data.category_id);
        }
    }
}
</script>

<style lang="scss" scoped>
$h: 90;
$lh: 20;
$pad: 6;
.root{
    margin-right: 4;
    width: 140;
    height: $h;
    padding: $pad;
    border-width: 1;
    border-color: #eeeeee;
    border-radius: 6;

    $ih: $h - $lh - $pad * 3;
    Image{
        width: $ih;
        height: $ih;
        margin-top: 0;
    }
    label{
        height: $lh;
        margin-top: $ih + 1;
        margin-left: $pad;
        font-size: 16;
    }
}
</style>

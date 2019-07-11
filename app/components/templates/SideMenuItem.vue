<template>
    <AbsoluteLayout class="root" :class="active ? 'active' : ''" @tap="tap" >
        <Image  :src="`~/assets/icons/${route.icon}.png`" />
        <label :text="route.text"/>
    </AbsoluteLayout>
</template>

<script>
export default {
    props: {
        route: {
            default: {}
        },
        active: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        tap(){
            if(this.active) return;
            this.$emit('tap', this.route);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/vars.scss';
$h: 44;
$pad: 10;
.root{
    height: $h;
    width: 98%;
    padding: $pad;
    background-color: white;
    border-color: white;
    border-width: 0 0 0 4;
    border-radius: 4;
    &.active{
        background-color: #f0f0f0;
        border-color: $primary-color;
        Image{
            opacity: 1;
        }
        label{
            color: #444;
        }
    }

    $iw: $h - $pad * 2;
    Image{
        height: $iw;
        width: $iw;
        opacity: 0.8;
    }
    label{
        margin-left: $h - 4;
        margin-top: -2;
        font-size: 20;
        color: rgb(77, 77, 77);
    }
}
</style>

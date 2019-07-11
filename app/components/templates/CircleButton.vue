<template>
    <CardView class="root" radius="32" :width="size" :height="size" :elevation="shadowSize" ripple="true" @tap="rootTap">
        <label v-if="text" :text="text"/>
        <slot></slot>
    </CardView>
</template>

<script>
export default {
    props: {
        size: {
            default: 32,
        },
        text: {
            type: String,
            default: '',
        },
        shadowSize: {
            default: 3,
        }
    },
    methods: {
        rootTap(){
            this.$emit('tap');
        },
    }
}
</script>

<style lang="scss" scoped>
@import '~/styles/vars';
.root{
    border-radius: 500;
    label{
        background-color: white;
        color: $primary-color;
        border-color: $primary-color;
        border-radius: 50%;
        height: 32;
        padding: 0;
        text-align: center;
        padding: 6;
    }
}

</style>

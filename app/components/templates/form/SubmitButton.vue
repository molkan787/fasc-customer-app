<template>
    <SolidButton @tap="tapped" :text="text" color="white" backgroundColor="#F36F24" radius="4" padding="12"/>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '',
        }
    },
    methods: {
        tapped(){
            this.$emit('tap');
        }
    }
}
</script>

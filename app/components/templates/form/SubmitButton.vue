<template>
    <StackLayout :padding="padding" width="100%">
        <SolidButton @tap="tapped" :text="text" color="white" width="100%"
            backgroundColor="#F36F24" radius="100" padding="12" margin="10 0 0 0" fontSize="15" boldText/>
    </StackLayout>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '',
        },
        padding: {
            default: '0 14 0 14',
        }
    },
    methods: {
        tapped(){
            this.$emit('tap');
        }
    }
}
</script>

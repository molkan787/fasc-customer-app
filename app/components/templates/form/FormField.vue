<template>
    <StackLayout class="form_field" :padding="padding" :margin="margin">
        <label v-if="title" class="title" :text="title"/>
        <slot></slot>
    </StackLayout>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        padding: {
            default: '',
        },
        margin: {
            default: '',
        }
    }
}
</script>

<style lang="scss" scoped>
.title{
    font-size: 14;
    margin-bottom: 4;
}
.form_field{
    margin-bottom: 14;
    padding: 0;
}
</style>

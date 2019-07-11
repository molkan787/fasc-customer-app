<template>
    <StackLayout class="form_field" :padding="padding" :margin="margin">
        <label v-if="title" class="title" :text="title"/>
        <label class="field_value" :text="value"/>
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
    .field_value{
        font-size: 18;
        margin-bottom: 4;
        color: #444;
    }
}
</style>

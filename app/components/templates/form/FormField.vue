<template>
    <StackLayout class="field_input" :class="{first, last}">
        <label v-if="title" class="title" :text="title"/>
        <slot></slot>
    </StackLayout>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '',
        },
        first: {
            type: Boolean,
            default: false,
        },
        last: {
            type: Boolean,
            default: false,
        }
    }
    
}
</script>

<style lang="scss" scoped>
.title{
    font-size: 14;
    margin-bottom: 2 2 0 2;
    color: #F36F24;
}
.field_input{
    background-color: white;
    padding: 6 20 6 20;
    border-width: 0 0 1 0;
    border-color: #eee;
}
$radius: 10;
.first{
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;
}
.last{
    border-bottom-left-radius: $radius;
    border-bottom-right-radius: $radius;
    border-width: 0;
}

</style>

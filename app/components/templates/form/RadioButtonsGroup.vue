<template>
    <StackLayout class="form_field">
        <label v-if="title" class="title" :text="title"/>

        <check-box class="cb" boxType="circle" fillColor="#F36F24" color="#666" scaleX="1.1" scaleY="1.1"
            v-for="(item, index) in items" :key="index" :text="item"
            :checked="selectedIndex == index" @tap="selectItem(index)" />

        

    </StackLayout>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        title: {
            type: String,
            default: '',
        },
        value: {
            type: Number,
            default: 0,
        },

    },
    data: () => ({
        selectedIndex: 0,
    }),
    watch: {
        value(val){
            this.selectedIndex = val;
        }
    },
    methods: {
        selectItem(index){
            this.selectedIndex = index;
            this.$emit('input', index);
        }
    },

    mounted(){
        this.selectedIndex = this.value;
    }
}
</script>

<style lang="scss" scoped>
.title{
    font-size: 14;
    margin-bottom: 4;
}
.form_field{
    margin-top: 10;
    padding: 0;
    .field_input{
        margin: 2;
    }
    .cb{
        margin-top: 4;
        margin-bottom: 2;
        margin-left: 10;
    }
}
</style>

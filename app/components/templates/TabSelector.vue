<template>
    <ScrollView orientation="horizontal" width="100%">
        <StackLayout orientation="horizontal">
            <Label text="All" @tap="itemTap(-1)" :class="{selected: -1 == selectedIndex}"/>
            <Label v-for="(item, index) in items" :key="index"
                :text="item[textProp]" @tap="itemTap(index)" :class="{selected: index == selectedIndex}"/>
        </StackLayout>
    </ScrollView>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            default: 0,
        },
        items: {
            type: Array,
            default: () => []
        },
        textProp: {
            type: String,
            default: 'text'
        },
        useAll: {
            type: Boolean,
            default: false
        }
    },
    watch:{
        value(){
            this.selectedIndex = this.value;
        }
    },
    data: () => ({
        selectedIndex: 0
    }),
    methods: {
        itemTap(index){
            this.selectedIndex = index
            this.$emit('input', index)
            // this.$emit('selectedChange', this.items[index])
        }
    },

    mounted(){
        this.selectedIndex = this.value;
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';
Label{
    font-size: 16;
    padding: 6 10;
    border-bottom-width: 2;
    border-bottom-color: #f8f8f8;
}
.selected{
    border-bottom-color: $primary-color;
    color: #222;
}
</style>
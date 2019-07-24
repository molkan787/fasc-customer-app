<template>
    <StackLayout class="root">
        <DockLayout class="header" width="100%"  stretchLastChild="true">
            <label dock="left" :text="title" class="title"/>
            <label dock="right" text="View all" class="viewAllLabel"/>
        </DockLayout>
        <ScrollView ref="scrollview" orientation="horizontal">
            <StackLayout class="items" orientation="horizontal">
                <CategoryItem v-for="item in items" :key="item.category_id" :data="item" @tap="itemTap"/>
            </StackLayout>
        </ScrollView>
    </StackLayout>
</template>

<script>
import CategoryItem from './CategoryItem';
export default {
    components:{
        CategoryItem,
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        items: {
            type: Array,
            default: () => [],
        }
    },
    methods: {
        itemTap(catId){
            this.$emit('itemTapped', catId);
        }
    },
    mounted(){
        setTimeout(() => {
            try {
                let scrollview = this.$refs.scrollview.nativeView;
                scrollview.android.setHorizontalScrollBarEnabled(false)
            } catch (error) { }
        }, 300);
    }
}
</script>

<style lang="scss" scoped>
$pad: 14;
.root{
    width: 100%;
    label.title{
        font-size: 18;
        color: #383838;
        font-weight: bold;
        margin-bottom: $pad;
        margin-left: $pad;
    }
}
.items{
    padding-left: $pad;
}
.header{
    padding-right: $pad;
}
.viewAllLabel{
    font-size: 14;
    text-align: right;
    color: #999;
}
</style>

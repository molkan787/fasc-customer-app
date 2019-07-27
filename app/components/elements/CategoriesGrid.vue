<template>
    <DockLayout class="root" tretchLastChild="true" width="100%" height="100%">
        <label dock="top" :text="title" class="header title"/>
        <ScrollView dock="bottom" ref="scrollview" orientation="vertical">
            <StackLayout class="items" orientation="vertical">
                <CategoryItem v-for="item in items" :key="item.category_id"
                    expand :data="item" @tap="itemTap"/>
            </StackLayout>
        </ScrollView>
    </DockLayout>
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
        },
        name: {
            type: String,
            default: ''
        }
    },
    methods: {
        itemTap(catId){
            this.$emit('itemTapped', catId);
        },

        viewAllTap(){
            this.$emit('viewAllTap', this.name);
        },
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
    &.expand{
        padding-right: $pad;
    }
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

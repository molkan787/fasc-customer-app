<template>
    <DockLayout class="root" tretchLastChild="true" width="100%" height="100%">
        <label dock="top" :text="title" class="header title"/>
        <ScrollView dock="bottom" ref="scrollview" orientation="vertical" width="100%">
            <GridLayout width="100%" class="items" :rows="rows" :columns="cols">
                <CategoryItem v-for="(item, index) in items" :key="item.category_id"
                    expand :data="item" @tap="itemTap" :row="getRow(index)" :col="getCol(index)"
                    :horizontalAlignment="getAlignment(index)"/>
            </GridLayout>
        </ScrollView>
    </DockLayout>
</template>

<script>
import CategoryItem from './CategoryItem';
const cols = 2;
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
    watch: {
        items(){
            this.updateRows();
        }
    },
    data: () => ({
        cols: '',
        rows: '',
    }),
    methods: {
        itemTap(catId){
            this.$emit('itemTapped', catId);
        },

        viewAllTap(){
            this.$emit('viewAllTap', this.name);
        },

        getRow(index){
            return Math.floor(index / cols);
        },
        getCol(index){
            return index % cols;
        },
        getAlignment(index){
            const col = this.getCol(index);
            if(col == 1) return 'right';
            // else if(col == 2) return 'right';
            else return 'left';
        },

        updateRows(){
            const len = Math.floor(this.items.length / cols) + 1;
            this.rows = new Array(len).fill('100').join(',');
        }
    },
    mounted(){
        const col = (this.$getViewSize().width - 28) / cols;
        this.cols = [col, col, col].join(',');
        this.updateRows();
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
    padding-right: $pad;
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

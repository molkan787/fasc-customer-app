<template>
    <StackLayout orientation="vertical">
        <ScrollView orientation="horizontal">
            <SegmentedBar class="con" v-model="selectedCat">
                <SegmentedBarItem title="All" class="item"/>
                <SegmentedBarItem v-for="item in items" :key="item.category_id" :title="item.name" class="item"/>
            </SegmentedBar>
        </ScrollView>
        <ScrollView orientation="horizontal" ref="subcats" v-if="subs.length">
            <SegmentedBar class="con" v-model="selectedSubCat">
                <SegmentedBarItem title="All" class="item"/>
                <SegmentedBarItem v-for="item in subs" :key="item.category_id" :title="item.name" class="item"/>
            </SegmentedBar>
        </ScrollView>
    </StackLayout>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        subs: {
            type: Array,
            default: () => [],
        }
    },
    data: () => ({
        selectedCat: 0,
        selectedSubCat: 0,
    }),
    methods: {
        // hideSubCats(){
        //     this.$refs.subcats.nativeView.animate({
        //         opacity: 0,
        //         height: 0,
        //         duration: 500,
        //     }).then(() => {
        //         this.$refs.subcats.nativeView.height = 0;
        //     });
        // },
        catsChanged(resetSubs){
            if(resetSubs && this.selectedSubCat != 0){
                this.selectedSubCat = 0;
                return;
            }
            this.$emit('changed', {
                cat: (this.selectedCat == 0) ? 0 : this.items[this.selectedCat-1].category_id,
                sub: (this.selectedSubCat == 0) ? 0 : this.subs[this.selectedSubCat-1].category_id,
            });
        }
    },
    watch: {
        selectedCat(){
            this.catsChanged(true);
        },
        selectedSubCat(newVal){
            this.catsChanged();
        }
    },
    created(){
    }
}
</script>

<style lang="scss" scoped>
SegmentedBar{
    selected-background-color:#F36F24;
    font-size: 16;
    padding: 0;
}
</style>

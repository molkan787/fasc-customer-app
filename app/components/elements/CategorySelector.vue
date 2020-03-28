<template>
    <StackLayout orientation="vertical">
        <TabSelector :items="items" textProp="name" v-model="selectedCat" useAll />
        <TabSelector :items="subs" textProp="name" v-model="selectedSubCat" useAll v-show="subs.length" />
        <!-- <ScrollView orientation="horizontal">
            <SegmentedBar class="con" v-model="selectedCat">
                <SegmentedBarItem title="All" class="item"/>
                <SegmentedBarItem v-for="item in items" :key="item.category_id" :title="item.name"
                    class="item"/>
            </SegmentedBar>
        </ScrollView> -->
        <!-- <ScrollView orientation="horizontal" ref="subcats" v-if="subs.length">
            <SegmentedBar class="con" v-model="selectedSubCat">
                <SegmentedBarItem title="All" class="item"/>
                <SegmentedBarItem v-for="item in subs" :key="item.category_id" :title="item.name" class="item"/>
            </SegmentedBar>
        </ScrollView> -->
    </StackLayout>
</template>

<script>
import TabSelector from '../templates/TabSelector'
export default {
    components: {
        TabSelector
    },
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
        selectedCat: -1,
        selectedSubCat: -1,
    }),
    methods: {
        catsChanged(resetSubs){
            if(resetSubs && this.selectedSubCat != -1){
                this.selectedSubCat = -1;
                return;
            }
            this.$emit('changed', {
                cat: (this.selectedCat == -1) ? 0 : this.items[this.selectedCat].category_id,
                sub: (this.selectedSubCat == -1) ? 0 : this.subs[this.selectedSubCat].category_id,
            });
        }
    },
    watch: {
        selectedCat(){
            this.catsChanged(true);
        },
        selectedSubCat(){
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

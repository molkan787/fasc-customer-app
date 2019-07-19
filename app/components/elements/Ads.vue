<template>
    <StackLayout width="100%" paddingBottom="10">
        <GridLayout v-for="(row, index) in rows" :key="index"
            rows="auto" :columns="row.sizes" :width="row.width" class="row">

            <Ripple v-for="(item, index) in row.items" :key="item.promo_id" row="0" :col="index"
                class="item" rippleColor="white">
                <Image :src="item.image"/>
            </Ripple>

        </GridLayout>
    </StackLayout>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => [],
        }
    },
    watch: {
        items(){
            this.updateRows();
        }
    },
    data: () => ({
        rows: [],
        totalWidth: 0,
    }),
    methods: {
        updateRows(){
            const rows = [];
            let row = {items: []};
            let sum = 0;
            for(let item of this.items){
                const span = this.formatToSpan(item.format);
                if(sum + span > 3 ){
                    sum = 0;
                    rows.push(row);
                    this.genColumnsSizes(row);
                    row = {items: []};
                }
                row.items.push(item);
                sum += span;
            }
            rows.push(row);
            this.genColumnsSizes(row);

            this.rows = rows;
        },

        formatToSpan(format){
            const span = 4 - parseInt(format);
            return span == 2 ? 1.5 : span;
        },
        genColumnsSizes(row){
            let sizes = '';
            let total = 0;
            for(let item of row.items){
                if(sizes.length) sizes += ',';
                const w = this.getWidthByFormat(item.format);;
                sizes += w;
                total += w;
            }
            row.sizes = sizes;
            row.width = total;
        },
        getWidthByFormat(format){
            switch (format) {
                case '1':
                    return this.totalWidth;
                case '2':
                    return this.totalWidth / 2;
                case '3':
                    return this.totalWidth / 3;
                default:
                    return '0';
            }
        }
    },

    mounted(){
        try {
            this.totalWidth = this.$getViewSize().width - 28;
            this.updateRows();
        } catch (error) {
        }
    }
}
</script>

<style lang="scss" scoped>
.root{
    text-align: center;
}
.row{
    margin-left: 2;
}
.item{
    margin-bottom: 10;
    margin-right: 2;
    Image{
        border-width: 1;
        border-color: #eeeeee;
        border-radius: 6;
    }
}

</style>

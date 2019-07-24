<template>
    <GridLayout :rows="rowsConfig" columns="*, 75, 35, 85" class="root" width="100%">

        <label class="header name" row="0" col="0" text="Name"/>
        <label class="header price" row="0" col="1" text="Price"/>
        <label class="header qty" row="0" col="2" text="Qty"/>
        <label class="header total" row="0" col="3" text="Total"/>

        <template v-for="(item, index) in items">
            <label :class="(index == items.length-1) ? 'last' : ''" class="name" :key="item.order_product_id" :row="index + 1" col="0" :text="item.name"/>
            <label :class="(index == items.length-1) ? 'last' : ''" class="price" :key="item.order_product_id" :row="index + 1" col="1" :text="item.price | price"/>
            <label :class="(index == items.length-1) ? 'last' : ''" class="qty" :key="item.order_product_id" :row="index + 1" col="2" :text="item.quantity"/>
            <label :class="(index == items.length-1) ? 'last' : ''" class="total" :key="item.order_product_id" :row="index + 1" col="3" :text="item.total | price"/>
        </template>

    </GridLayout>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => [],
        }
    },
    data: () => ({
        rowsConfig: '',
    }),
    watch: {
        items: {
            deep: true,
            handler(){
                this.updateRowsConfig();
            }
        }
    },
    methods:{
        updateRowsConfig(){
            const conf = '36,'.repeat(this.items.length + 1);
            this.rowsConfig = conf.substr(0, conf.length - 1);
        }
    },

    mounted(){
        this.updateRowsConfig();
    }
}
</script>

<style lang="scss" scoped>
.root{
    padding: 8;
}
$br: 4;
label{
    border-color: #bbb;
    border-left-width: 1;
    border-top-width: 1;
    font-size: 16;
    padding: 3;
    &.price, &.total{
        text-align: right;
        &.header{
            text-align: center;
        }
    }
    &.qty{
        text-align: center;
    }
    &.header{
        font-weight: bold;
        background-color: #f0f0f0;
        &.name{
            border-top-left-radius: $br;
        }
        &.total{
            border-top-right-radius: $br;
        }
    }
    &.last{
        border-bottom-width: 1;
        &.name{
            border-bottom-left-radius: $br;
        }
        &.total{
            border-bottom-right-radius: $br;
        }
    }
    &.total{
        border-right-width: 1;
    }
}
</style>

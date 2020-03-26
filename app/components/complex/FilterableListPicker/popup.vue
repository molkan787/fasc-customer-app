<template>
    <Page actionBarHidden="true" :width="myWidth">
        <GridLayout columns="*" rows="50,*">
            <TextField v-model="search" col="0" row="0" :hint="searchHint"/>
            <ListView col="0" row="1" for="item in items" @itemTap="onItemTap">
                <v-template>
                    <Label :text="item[textProp]" />
                </v-template>
            </ListView>
        </GridLayout>
    </Page>
</template>

<script>
const scope = global.__openListPickerScope = {}
global.openListPicker = (items, options) => {
    return new Promise((resolve, reject) => {
        scope.resolve = resolve
        scope.reject = reject
        scope.items = items
        scope.options = options;
    })
}
export default {
    data: () => ({
        myWidth: 0,
        searchHint: '',
        textProp: null,

        search: '',
        sourceItems: [],
        items: []
    }),
    watch: {
        search(text){
            const _t = text.toLowerCase()
            this.items = text
                ? this.sourceItems.filter(i => i[this.textProp].toLowerCase().includes(_t))
                : this.sourceItems;
        }
    },
    methods: {
        onItemTap(e){
            this.$modal.close()
            scope.resolve(e.item)
        },

        update(){
            this.items = scope.items
            this.sourceItems = scope.items
            const o = scope.options
            this.searchHint = o && o.searchHint || 'Type to filter'
            this.textProp = o && o.textProp || 'text'
        },

        goBack(){
            this.$modal.close()
            scope.reject({cancelled: true})
        },
    },

    created(){
        const w = this.$getViewSize().width * 0.9
        this.myWidth = w

        
    },

    mounted(){
        this.$vRouter.setOneTimeBackHandler(() => this.goBack());
        this.update();
    }
}
</script>

<style lang="scss" scoped>
TextField{
    font-size: 20;
    padding: 4 10 10 10;
}
Label{
    font-size: 20;
    padding: 10;
}
</style>
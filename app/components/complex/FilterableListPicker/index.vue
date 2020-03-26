<template>
    <Button :text="_text" @tap="open"/>
</template>

<script>
import Popup from './popup';
import { topmost } from 'ui/frame';
export default {
    props: {
        value: {
            default: null
        },
        items: {
            type: Array,
            default: []
        },
        textProp: {
            type: String,
            default: 'text',
        },
        searchHint: {
            type: String,
            default: null,
        },
        text: {
            type: String,
            default: 'Click to select',
        }
    },
    data: () => ({
        myValue: null,
    }),
    watch: {
        value(val){ this.myValue = val }
    },
    computed: {
        _text(){
            return this.myValue ? this.myValue[this.textProp] : this.text
        }
    },
    methods: {
        open(){
            global.openListPicker(this.items, {
                searchHint: this.searchHint,
                textProp: this.textProp
            })
            .then(item => {
                this.myValue = item
                this.$emit('input', item)
            })
            topmost().currentPage.__vuePageRef__.$showModal(Popup, {}, null, true)
        }
    },

    mounted(){
        this.myValue = this.value;
    }
}
</script>

<style lang="scss" scoped>
Button{
    background-color: #eee;
    border-radius: 6;
    font-size: 18;
}
</style>
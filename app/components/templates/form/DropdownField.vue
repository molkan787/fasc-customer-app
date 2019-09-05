<template>
    <FormField :first="first" :last="last" :title="title">
        <GridLayout rows="*" columns="*, 18">
            <DropDown row="0" col="0" class="dropdown" :items="items" :selectedIndex="value" 
                @selectedIndexChange="selectedIndexChange"
                :disabled="disabled" :hint="hint == null ? title : hint" ref="dd" />
            <Image row="0" col="1" class="arrowDown" src="~/assets/icons/arrow_down.png" @tap="arrowDownTap"/>
        </GridLayout>
        <slot></slot>        
    </FormField>
</template>

<script>
import FormField from './FormField';
export default {
    components: {
        FormField,
    },
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        value: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        hint: {
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        first: {
            type: Boolean,
            default: false,
        },
        last: {
            type: Boolean,
            default: false,
        }
    },
    data: () => ({
        selectedIndex: 0,
    }),
    watch: {
        selectedIndex(){
            console.log(this.selectedIndex);
        }
    },
    methods: {
        selectedIndexChange(){
            const index = this.$refs.dd.nativeView.selectedIndex;
            this.$emit('input', index);
            this.$emit('selectedIndexChanged', index);
        },

        arrowDownTap(){
            console.log('Calling');
            this.$refs.dd.nativeView.open();
            console.log('No errors');
        }
    }
    
}
</script>

<style lang="scss" scoped>
.field_input{
    background-color: white;
    padding: 6 20 6 20;
    border-width: 0 0 1 0;
    border-color: #eee;
}
.dropdown{
    font-size: 17;
    padding: 6;
    margin: 0 0 0 -12;
    background-color: white;
}
.arrowDown{
    opacity: 0.3;
    margin-top: 4;
}
</style>

<template>
    <FormField :first="first" :last="last" :title="title">
        <label :text="value == null ? hint : value" class="input" :class="value != null ? 'haveValue' : ''"
            @tap="labelTapped"/>
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
        value: {
            type: String,
            default: null,
        },
        title: {
            type: String,
            default: '',
        },
        hint: {
            default: '',
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
    methods: {
        labelTapped(){
            if(!this.disabled){
                this.$emit('tap');
            }
        }
    }
    
}
</script>

<style lang="scss" scoped>
.input{
    font-size: 17;
    padding: 6 6 6 0;
    background-color: white;
    color: #999;
    &.haveValue{
        color: #666;
    }
}
</style>

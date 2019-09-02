<template>
    <FormField :first="first" :last="last" :title="title">
        <label :text="value ? value.toLocal() : hint" class="input" :class="value ? 'haveValue' : ''"
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
            type: Object,
            default: null,
        },
        title: {
            type: String,
            default: '',
        },
        hint: {
            default: 'Select a date',
        },
        minDate: {
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
    methods: {
        labelTapped(){
            if(this.disabled) return;

            this.$selectDate({ minDate: this.minDate }).then(result => {
                this.$emit('input', result);
                this.$emit('changed', result);
            })
            .catch(err => console.log(err))
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
.input{
    font-size: 17;
    padding: 6 6 6 0;
    background-color: white;
    color: #888;
    &.haveValue{
        color: #666;
    }
}
</style>

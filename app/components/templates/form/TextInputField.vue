<template>
    <StackLayout class="field_input" :class="first ? 'first' : (last ? 'last' : '')">
        <label v-if="title" class="title" :text="title"/>
        <TextField class="input" v-model="pvalue" :editable="!disabled" :hint="hint || title" :keyboardType="keyboard"/>            
    </StackLayout>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        hint: {
            type: String,
            default: '',
        },
        keyboard: {
            type: String,
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
    data: () => ({
        pvalue: '',
    }),
    watch: {
        value(){
            this.updateValue();
        },
        pvalue(){
            this.emitValue();
        }
    },
    methods: {
        updateValue(){
            this.pvalue = this.value;
        },
        emitValue(){
            this.$emit('input', this.pvalue);
        }
    },

    mounted(){
        this.updateValue();
    }
    
}
</script>

<style lang="scss" scoped>
.title{
    font-size: 14;
    margin-bottom: 2 2 0 2;
    color: #d0d0d0;
}
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
}
$radius: 10;
.first{
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;
}
.last{
    border-bottom-left-radius: $radius;
    border-bottom-right-radius: $radius;
    border-width: 0;
}

</style>

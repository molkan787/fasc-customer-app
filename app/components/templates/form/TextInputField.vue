<template>
    <StackLayout class="form_field">
        <label v-if="title" class="title" :text="title"/>
        <CardView elevation="2" class="field_input">
            <TextField class="input" v-model="pvalue" :editable="!disabled" :hint="hint || title" :keyboardType="keyboard" />
        </CardView>
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
    margin-bottom: 4;
}
.form_field{
    margin-bottom: 14;
    padding: 0;
    .field_input{
        margin: 2;
    }
}
.input{
    font-size: 19;
    padding: 6;
    background-color: white;
}
</style>

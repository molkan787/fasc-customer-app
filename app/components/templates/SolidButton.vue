<template>
    <Ripple @tap="tapped">
        <label class="lbl" horizontalAlignment="center" :text="text"
            :padding="padding" :fontSize="fontSize" :color="color" :class="textAlign"
            :borderRadius="radius" :backgroundColor="backgroundColor"/>
    </Ripple>
</template>

<script>
export default {
    props:{
        text: {
            type: String,
            default: '',
        },
        padding: {
            default: 8,
        },
        fontSize: {
            default: 18,
        },
        color: {
            default: '',
        },
        backgroundColor: {
            default: '',
        },
        radius: {
            default: 0,
        },
        textAlign: {
            type: String,
            default: 'center'
        }
    },
    methods: {
        tapped(){
            this.$emit('tap')
        }
    }
}
</script>

<style scoped>
.left{
    text-align: left;
}
.center{
    text-align: center;
}
.right{
    text-align: right;
}
.lbl{
    width: 100%;
}
</style>

<template>
    <GridLayout v-if="align" class="grid" rows="*" columns="*" width="100%" height="100%" @tap="panelTapped">
        <ActivityIndicator color="#F36F24" row="0" horizontalAlignment="center"
            verticalAlignment="middle" col="0"
            #activityIndicator busy="true" :width="size" :height="size" />
    </GridLayout>
    <ActivityIndicator v-else color="#F36F24" row="1"
        #activityIndicator busy="true" :width="size" :height="size" />
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 50,
        },
        align: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        panelTapped(){
            this.$emit('tap');
        }
    }
}
</script>

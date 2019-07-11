<template>
    <GridLayout class="grid" rows="*" columns="*" width="100%" height="100%" >
        <StackLayout row="0" col="0" verticalAlignment="middle" width="100%" class="content">
            <Image :src="'~/assets/' + image" class="img" horizontalAlignment="center"/>
            <label :text="text" class="lbl" horizontalAlignment="center"/>
        </StackLayout>
    </GridLayout>
</template>

<script>
export default {
    props: {
        image: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            default: '',
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    margin-top: -50;
}
.img{
    width: 100;
    opacity: 0.4;
}
.lbl{
    font-size: 18;
    color: #999;
}
</style>

<template>
    <AbsoluteLayout class="root" :height="size">
        <Image src="~/assets/res/shadow.png" class="img"
            scaleX="1.4" :scaleY="size / 70" height="70" :marginTop="(70 - size) / -2"/>
    </AbsoluteLayout>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 10
        }
    }
}
</script>


<style lang="scss" scoped>
.root{
    width: 100%;
}
</style>

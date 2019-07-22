<template>
    <GridLayout>
        <ShadowPanel :opacity="shadowOpacity" :padding="shadowPadding"/>
        <GridLayout :padding="contentPadding" width="100%" height="100%">
            <template v-if="ripple">
                <Ripple width="100%" height="100%" :rippleColor="rippleColor" @tap="tapped">
                    <DockLayout v-if="container == 'dock'" class="container" :padding="innerPadding" >
                        <slot></slot>
                    </DockLayout>
                    <StackLayout v-else-if="container == 'stack'" class="container" :padding="innerPadding">
                        <slot></slot>
                    </StackLayout>
                    <AbsoluteLayout v-else-if="container == 'absolute'" class="container" :padding="innerPadding">
                        <slot></slot>
                    </AbsoluteLayout>
                    <GridLayout v-else-if="container == 'grid'" class="container" :padding="innerPadding">
                        <slot></slot>
                    </GridLayout>
                </Ripple>
            </template>
            <template v-else>
                <DockLayout v-if="container == 'dock'" class="container" :padding="innerPadding" @tap="tapped" >
                    <slot></slot>
                </DockLayout>
                <StackLayout v-else-if="container == 'stack'" class="container" :padding="innerPadding" @tap="tapped">
                    <slot></slot>
                </StackLayout>
                <AbsoluteLayout v-else-if="container == 'absolute'" class="container" :padding="innerPadding" @tap="tapped">
                    <slot></slot>
                </AbsoluteLayout>
                <GridLayout v-else-if="container == 'grid'" class="container" :padding="innerPadding" @tap="tapped">
                    <slot></slot>
                </GridLayout>
            </template>
        </GridLayout>
    </GridLayout>
</template>

<script>
export default {
    props: {
        shadowOpacity: {
            default: '0.15',
        },
        shadowPadding: {
            default: '0',
        },
        contentPadding: {
            default: '6',
        },
        innerPadding: {
            default: '0',
        },
        container: {
            type: String,
            default: 'dock'
        },
        ripple: {
            type: Boolean,
            default: false,
        },
        rippleColor: {
            type: String,
            default: '#aaa',
        }
    },
    methods: {
        tapped(){
            this.$emit('tap');
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 10;
}
</style>

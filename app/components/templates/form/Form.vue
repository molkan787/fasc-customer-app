<template>
    <AbsoluteLayout :margin="margin" :height="rootHeight" width="100%">
        <ShadowPanel :opacity="shadowOpacity" height="100%" width="100%" :padding="shadowPadding"/>
        <StackLayout class="formItems" ref="formItems" width="100%" :padding="contentPadding">
            <slot></slot>
        </StackLayout>
    </AbsoluteLayout>
</template>

<script>
export default {
    props: {
        contentPadding: {
            default: '14',
        },
        shadowPadding: {
            default: '4 0 0 0',
        },
        shadowOpacity: {
            default: 0.2,
        },
        margin: {
            default: '0',
        }
    },
    data: () => ({
        rootHeight: 0,
    }),
    methods: {
        updateSize(){
            const formItemsSize = this.$refs.formItems.nativeView.getActualSize();
            this.rootHeight = formItemsSize.height;
        }
    },

    mounted(){
        const formItems = this.$refs.formItems.nativeView;
        formItems.on("layoutChanged", () => {
            setTimeout(() => this.updateSize(), 1);
        })
    }
}
</script>

<template>
    <AbsoluteLayout v-if="container == 'absolute'">
        <slot></slot>
    </AbsoluteLayout>
    <StackLayout v-else>
        <slot></slot>
    </StackLayout>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'WalkOn Retail',
        },
        backButton: {
            type: Boolean,
            default: false,
        },
        actionBar: {
            type: Boolean,
            default: true,
        },
        container: {
            type: String,
            default: 'absolute',
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        title() { this.emitPropsChange('title') },
        backButton() { this.emitPropsChange('backButton') },
        actionBar() { this.emitPropsChange('actionBar') },
        loading() { this.emitPropsChange('loading') },
    },
    methods: {
        emitPropsChange(name){
            this.$vRouter.pagePropsChange(name, this[name]);
        }
    },

    mounted(){
        this.emitPropsChange('title');
        this.emitPropsChange('backButton');
        this.emitPropsChange('actionBar');
        this.emitPropsChange('loading');
    }
}
</script>

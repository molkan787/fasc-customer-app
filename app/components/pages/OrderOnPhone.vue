<template>
    <MPage title="Order on Phone">
        <GridLayout height="100%" width="100%" class="root">
            <StackLayout width="100%" verticalAlignment="center" class="stack">
                <label class="header" text="You can order products by calling us" textWrap="true"/>
                <SubmitButton text="CALL" radius="6" width="100%" @tap="call" scaleX="0.9" scaleY="0.9"/>
            </StackLayout>
        </GridLayout>
    </MPage>
</template>

<script>
import SubmitButton from '../templates/form/SubmitButton';
import { mapState } from 'vuex';
export default {
    components: {
        SubmitButton,
    },
    computed: mapState(['contactInfo']),
    methods: {
        call(){
            const utilsModule = require("tns-core-modules/utils/utils");
            utilsModule.openUrl("tel:" + this.contactInfo.order_phone);
        }
    }
}
</script>

<style lang="scss" scoped>
.root{
    padding: 80;
    text-align: center;
}
.stack{
    margin-top: -20;
}
.header{
    font-size: 18;
    color: #666;
    margin-bottom: 30;
}
</style>

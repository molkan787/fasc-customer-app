<template>
    <MPage title="Contact Us">
        <GridLayout height="100%" width="100%" class="root" scaleX="0.9" scaleY="0.9">
            <StackLayout width="100%" verticalAlignment="center" class="stack">
                <Image src="~/assets/icons/location.png" class="icon"/>
                <label class="header" :text="`(${contactInfo.name})\n${contactInfo.address}`" textWrap="true"/>
                <label class="separator"/>
                <label class="header" text="You can contact us by calling or sending an email" textWrap="true"/>
                <SubmitButton text="CALL US" radius="6" width="80%" @tap="call" marginBottom="10"/>
                <SubmitButton text="SEND AN EMAIL" radius="6" width="80%" @tap="email"/>
                <label class="subHeader" :text="`Phone: ${contactInfo.phone}\nEmail: ${contactInfo.email}`" textWrap="true"/>
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
            utilsModule.openUrl("tel:" + this.contactInfo.phone);
        },
        email(){
            const utilsModule = require("tns-core-modules/utils/utils");
            utilsModule.openUrl("mailto:" + this.contactInfo.email);
        }
    }
}
</script>

<style lang="scss" scoped>
.root{
    padding: 20;
    text-align: center;
}
.stack{
    margin-top: -20;
}
.header{
    font-size: 20;
    color: #666;
    margin-bottom: 30;
}
.subHeader{
    font-size: 18;
    color: #666;
    margin-bottom: 10;
    margin-top: 10;
}
.icon{
    width: 80;
    height: 80;
}
.separator{
    width: 80%;
    height: 1;
    background-color: #bbb;
    margin: 0 0 20 0;
}
</style>

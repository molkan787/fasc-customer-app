<template>
    <MPage title="My Account">
        <DockLayout width="100%" height="100%" class="root" stretchLastChild="true">
            <StackLayout dock="top" width="100%" >
                <label class="header" :text="customerName"/>
                <ShadowBar size="10" :opacity="0.1"/>
            </StackLayout>
            <DockLayout dock="bottom" width="100%" height="100%" stretchLastChild="true" horizontalAlignment="center">
                <CardView dock="top" elevation="3" ripple="true" radius="6" class="card" height="90" width="94%" marginTop="7">
                    <StackLayout class="form_field" padding="16">
                        <label class="title" text="Phone number"/>
                        <label class="field_value" :text="customerPhone"/>
                    </StackLayout>
                </CardView>
                <GridLayout dock="bottom">
                    <CardView elevation="3" radius="6" class="card" width="94%" height="92%" marginTop="7">
                        <AbsoluteLayout width="100%" height="100%">
                            <DockLayout class="form_field" padding="16" stretchLastChild="true" width="100%" height="100%">
                                <DockLayout dock="top" width="100%" height="30">
                                    <label class="title" text="Addresses" dock="left"/>
                                    <label text="" width="30%" dock="center"/>
                                    <SolidButton dock="right" padding="0" fontSize="16" @tap="addAddressTap"
                                        text="Add new address" color="#F36F24" textAlign="right"/>
                                </DockLayout>
                                <ScrollView dock="bottom">
                                    <StackLayout>
                                        <AddressItem v-for="addr in customerAddresses" :key="addr.address_id"
                                            :data="addr" @deleteTap="addrDeleteTap"/>
                                    </StackLayout>
                                </ScrollView>
                            </DockLayout>
                            <Spinner v-if="addressesLoading" align backgroundColor="#60ffffff" />
                        </AbsoluteLayout>
                    </CardView>
                </GridLayout>
            </DockLayout>
        </DockLayout>
    </MPage>
</template>

<script>
import ValueField from '../templates/form/ValueField';
import FormField from '../templates/form/FormField';
import AddressItem from '../elements/AddressItem';
import { mapState } from 'vuex';
import Helper from '~/logic/helper';
import AccountLogic from '~/logic/account';

export default {
    components: {
        ValueField,
        FormField,
        AddressItem,
    },
    computed: {
        ...mapState(['customerAddresses']),
        customerName(){
            const c = this.$customer();
            if(!c) return '';
            return c.firstname + ' ' + c.lastname;
        },
        customerPhone(){
            const c = this.$customer();
            if(!c) return '';
            return c.phone;
        }
    },
    data: () => ({
        addressesLoading: false,
    }),
    methods: {
        addrDeleteTap(addr){
            const addr_str = Helper.addressObjectToString(addr);
            this.confirm(`Are you sure you want to delete address "${addr_str}"?`)
            .then(result => {
                if(!result) return;
                this.addressesLoading = true;
                AccountLogic.deleteAddress(addr.address_id)
                .then(() => {
                    this.msg('The address was successfully deleted.');
                })
                .catch(err => {
                    this.msg('We could not complete the action, Please try again.');
                })
                .finally(() => {
                    this.addressesLoading = false;
                });
            })
        },

        addAddressTap(){
            this.$goTo('addAddress');
        },

        msg(text){
            return alert({
                title: 'Account',
                message: text,
                okButtonText: 'OK'
            });
        },

        confirm(text){
            return confirm({
                title: 'Account',
                message: text,
                okButtonText: 'Yes',
                cancelButtonText: 'No'
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.root{
    background-color: white;
}
.header{
    width: 100%;
    font-size: 22;
    color: #666;
    padding: 14;
    text-align: center;
    background-color: white;
}
.title{
    font-size: 16;
    margin-bottom: 4;
}
.form_field{
    padding: 0;
    .field_value{
        font-size: 22;
        margin-bottom: 4;
        color: #444;
    }
}
</style>


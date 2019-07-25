<template>
    <GridLayout>
        <CardView elevation="3" radius="6" class="card" width="94%" height="96%" marginTop="3">
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
</template>

<script>
import { mapState } from 'vuex';
import Helper from '~/logic/helper';
import AccountLogic from '~/logic/account';
import AddressItem from '../../elements/AddressItem';

export default {
    components: {
        AddressItem,
    },
    data: () => ({
        addressesLoading: false,
    }),
    computed: mapState(['customerAddresses']),
    methods: {
        addrDeleteTap(addr){
            const addr_str = Helper.addressObjectToString(addr);
            this.$confirm(`Are you sure you want to delete address "${addr_str}"?`, 'Account')
            .then(result => {
                if(!result) return;
                this.addressesLoading = true;
                AccountLogic.deleteAddress(addr.address_id)
                .then(() => {
                    this.$alert('The address was successfully deleted.', 'Account');
                })
                .catch(err => {
                    this.$alert('We could not complete the action, Please try again.', 'Account');
                })
                .finally(() => {
                    this.addressesLoading = false;
                });
            })
        },

        addAddressTap(){
            this.$goTo('addAddress', {
                redirect: {
                    name: 'account',
                    params: {
                        tabIndex: 2,
                    }
                }
            });
        },
    }
}
</script>


<template>
    <Card @tap="tapped" class="root" :ripple="ripple" width="100%" :height="cancelButton ? 116 : 88" contentPadding="6 12 6 12" horizontalAlignment="center">
        <GridLayout rows="30, 30, 24" columns="*, 120" padding="10 14 10 14">
            <label row="0" col="0" :text="orderDate"/>
            <label row="0" col="1" :text="'Order #' + data.order_id" class="orderId"/>
            <label row="1" col="1" :text="orderValue" class="orderTotal"/>
            <AbsoluteLayout row="1" col="0">
                <StackLayout orientation="horizontal" class="status" :backgroundColor="statusColor">
                    <Image class="statusIcon" :src="'~/assets/icons/' + statusIcon" horizontalAlignment="left"/>
                    <label class="statusText" :text="statusText" horizontalAlignment="left"/>
                </StackLayout>
            </AbsoluteLayout>
            <SolidButton row="2" col="1" v-if="cancelButton && data.order_status_id != '7'" text="Cancel order"
                radius="6" backgroundColor="#F66C6C" color="white" fontSize="14" boldText padding="2" height="30" @tap="cancelTapped" />
        </GridLayout>
    </Card>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
        cancelButton: {
            type: Boolean,
            default: false,
        },
        ripple: {
            type: Boolean,
            default: true,
        }
    },
    data: () => ({
        orderDate: '',
        orderValue: '',

        statusIcon: '',
        statusColor: '',
        statusText: '',
    }),
    watch: {
        data: {
            deep: true,
            handler(){ this.updateData(); }
        }
    },
    methods: {
        updateData(){
            this.orderDate = new Date(this.data.date_added).toLocaleDateString();
            this.orderValue = this.$options.filters.price(this.data.total);
            const statusId = parseInt(this.data.order_status_id);
            this.statusIcon = this.getOrderStatusIcon(statusId);
            this.statusColor = this.getOrderStatusColor(statusId);
            this.statusText = this.getOrderStatusText(statusId);
        },

        getOrderStatusText(status_id) {
            if (status_id == 1) {
                return 'Pending';
            } else if (status_id == 5) {
                return 'Completed';
            } else if (status_id == 7) {
                return 'Canceled';
            }else{
                return '';
            }
        },

        getOrderStatusIcon(status_id) {
            if (status_id == 1) {
                return 'clock.png';
            } else if (status_id == 5) {
                return 'checked_white.png';
            } else if (status_id == 7) {
                return 'close_white.png';
            }else{
                return '';
            }
        },

        getOrderStatusColor(status_id) {
            if (status_id == 1) {
                return '#fcda68';
            } else if (status_id == 5) {
                return '#52C993';
            } else if (status_id == 7) {
                return '#F66C6C';
            } else {
                return '';
            }
        },

        tapped(){
            this.$emit('tap', this.data);
        },
        cancelTapped(){
            this.$emit('cancelTap', this.data);
        }
    },

    mounted(){
        this.updateData();
    }
}
</script>


<style lang="scss" scoped>
@import '~/styles/vars';
.root{
    margin-bottom: -8;
}
label{
    color: #444;
    font-size: 16;
}
.orderId{
    text-align: right;
}
.orderTotal{
    text-align: right;
    color: $primary-color;
}
.status{
    border-radius: 40;
    padding: 2 8 2 3;
}
.statusText{
    font-size: 15;
    margin-left: 4;
    margin-top: -1;
    color: white;
}
.statusIcon{
    height: 18;
    margin-top: 0;
}
</style>

<template>
    <CardView @tap="tapped" class="root" elevation="2" radius="6" ripple="true" width="96%" height="104" horizontalAlignment="center">
        <GridLayout rows="30, 30, 30" columns="*, 120" padding="10">
            <label row="0" col="0" :text="'Order date: ' + orderDate"/>
            <label row="0" col="1" :text="'Order #' + data.order_id" class="orderId"/>
            <label row="1" col="0" :text="'Order value: ' + orderValue"/>
            <Image row="2" col="0" class="statusIcon" :src="'~/assets/icons/' + statusIcon" horizontalAlignment="left"/>
            <label row="2" col="0" class="statusText" :color="statusColor" :text="statusText" horizontalAlignment="left"/>
            <SolidButton row="2" col="1" v-if="cancelButton && data.order_status_id != '7'" text="Cancel order"
                radius="6" backgroundColor="#ddd" color="#555" fontSize="14" padding="2" height="30" @tap="cancelTapped" />
        </GridLayout>
    </CardView>
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
                return 'Cancelled';
            }else{
                return '';
            }
        },

        getOrderStatusIcon(status_id) {
            if (status_id == 1) {
                return 'clock.png';
            } else if (status_id == 5) {
                return 'checked.png';
            } else if (status_id == 7) {
                return 'close_red.png';
            }else{
                return '';
            }
        },

        getOrderStatusColor(status_id) {
            if (status_id == 1) {
                return '#F36F24';
            } else if (status_id == 5) {
                return '#49B747';
            } else if (status_id == 7) {
                return '#F44336';
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
    margin-top: 8;
}
label{
    color: #444;
    font-size: 16;
}
.orderId{
    text-align: right;
}
.statusText{
    margin-left: 22;
}
.statusIcon{
    height: 20;
    margin-top: -7;
}
</style>

import DataFetcher from '~/struct/dataFetcher';

export default class Orders{

    static async loadOrders(){
        const resp = await DataFetcher.fetch('orderadm/listCS');
        if(resp.status == 'OK'){
            return resp.data.items;
        }else{
            throw resp.error_code;
        }
    }

    static async loadOrderDetails(order_id){
        const resp = await DataFetcher.post('orderadm/infoCS', {order_id});
        if (resp.status == 'OK') {
            return resp.data;
        } else {
            throw resp.error_code;
        }
    }

    static async cancelOrder(order_id){
        const resp = await DataFetcher.post('orderadm/cancel', { order_id });
        if (resp.status == 'OK') {
            return resp.data;
        } else {
            throw resp.error_code;
        }
    }

}
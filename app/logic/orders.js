import DataFetcher from '~/struct/dataFetcher';
// import { HandleFile } from 'nativescript-handle-file';
const utilsModule = require("tns-core-modules/utils/utils");

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

    static async downloadInvoice(order_id){
        const dl = DataFetcher.buildQueryUrl('invoice', { order_id });
        console.log(dl)
        utilsModule.openUrl(dl);
        return true;
        // const handleFile = new HandleFile();
        // return await handleFile.open({
        //     name: `WalkOn Invoice ${order_id}.pdf`,
        //     url: dl,
        //     directory: 'downloads', 
        //     title: 'Open invoice with'
        // });
    }

}
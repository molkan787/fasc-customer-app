import DataFetcher from '../struct/dataFetcher';
import DynamicTexts from './dynamicTexts';
import { RazorpayCheckout } from 'nativescript-razorpay';

export default class CartLogic{

    static init(context){
        this.context = context;
        this.cartData = context.state.cart;
        this.orderData = context.state.cart.order;
    }

    static validateFormData(step){
        const d = this.orderData;
        if(step == 0){
            const min = parseFloat(this.context.state.bsd.min_total);
            return (this.cartData.productsTotal >= min);
        }else if(step == 1){
            if (!this.context.state.customerAddresses[d.deliveryAddress]) {}
            else if (!d.deliveryDate) {}
            else return true;
            return false;
        }else if(step == 2){
            return d.paymentMethod && true;
        }
    }

    static async postOrder(){

        const { deliveryAddress, deliveryDate, deliveryTime, paymentMethod} = this.orderData;

        const counts = this.context.state.cart.counts;
        const items = {};
        for(let pid in counts){
            if(counts[pid]){
                items[pid] = counts[pid];
            }
        }
        const addr = this.context.state.customerAddresses[deliveryAddress];
        const data = {
            address_1: addr.address_1,
            address_2: addr.address_2,
            city: addr.city,
            del_date: deliveryDate.toBasic(),
            del_timing: DynamicTexts.get('deliveryTime', { name: deliveryTime, noPrice: true }),
            fast_del: (deliveryTime == 'fast') ? 1 : 0,
            pay_method: paymentMethod,
            products: JSON.stringify({ items }),
        };
        
        const resp = await DataFetcher.post('pos/addOrderCS', data);

        if(resp.status == 'OK'){

            if (paymentMethod != 'cod') {
                const success = await this.payment(resp.data, paymentMethod);
                if (!success)
                    throw 'payment_canceled';
            }

            this.context.dispatch('clearCart');
            return resp.data;
        }else{
            throw resp.error_code;
        }
    }

    static async payment(data, method){
        if(method == 'razor'){
            return await this._pay_Razorpay(data);
        }
    }

    // -------------------------------------

    static async _pay_Razorpay(data){
        const customer = this.context.state.customer;
        let payment_id;
        try {
            payment_id = await new RazorpayCheckout(data.api_key).open({
                "amount": parseFloat(data.total) * 100, //In paise 
                "description": 'WalkOn Retail Order #' + data.order_id,
                "image": "https://walkonretail.com/image/catalog/Logos/circle_logo.png",
                "name": "WalkOn Retail",
                "prefill": {
                    "contact": customer.phone,
                    "email": customer.email,
                    "name": customer.firstname + ' ' + customer.lastname,
                },
                theme: {
                    color: '#F36F24'
                }
            });
        } catch (error) {
            return false;   
        }
        const resp = await DataFetcher.fetch('cspv/razor', { payment_id, order_id: data.order_id });
        if (resp.status == 'OK') {
            return true;
        } else {
            throw resp.error_code;
        }
    }

}
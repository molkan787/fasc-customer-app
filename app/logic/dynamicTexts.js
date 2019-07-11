import Helper from './helper';
export default class DynamicTexts{

    static install(Vue, context){
        Vue.prototype.$dynamicText = (name, params) => {
            return this.get(name, params);
        }
        this.init(context)
    }

    static init(context){
        this.state = context.state;
    }

    static get(name, params){
        if (this[name]){
            return this[name](params);
        }else{
            return null;
        }
    }
    
    // ================================
    static deliveryTime(param){
        const name = typeof param == 'object' ? param.name : param;
        const ip = !param.noPrice;
        const bsd = this.state.bsd;
        if (name == 'regular'){
            return `Regular delivery (${bsd.timing_from} - ${bsd.timing_to})` + (ip ? "\nFree" : '');
        } else if (name == 'fast'){
            return `Fast delivery (${Helper.minutesToTimeText(parseInt(bsd.timing_slot) * 15)})` + (ip ? `\n${Helper.formatPrice(bsd.fast_del_cost)}` : '');
        }else{
            return '';
        }
    }

    static minTotalMsg(){
        return `The order value need to be at least ${Helper.formatPrice(this.state.bsd.min_total)} to place an order`;
    }

}
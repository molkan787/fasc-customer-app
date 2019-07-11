export default class Helper{

    static getFinalPrice(p){
        const price = parseFloat(p.price);
        let discount = parseFloat(p.discount_amt);
        if (parseInt(p.discount_type) == 1) discount *= price / 100; // Type 2 is Percent discount
        return price - discount;
    }

    static formatPrice(val){
        const amt = parseFloat(val);
        return amt.toFixed(2) + ' \u20B9';
    }

    static minutesToTimeText(mins){
        const _mins = parseInt(mins);
        const _m = _mins % 60;
        const _h = parseInt((_mins - _m) / 60);
        if(_h){
            return `${_h}h ${_m}m`;
        }else{
            return `${_m} Minutes`;
        }
    }

    static addressObjectToString(addr){
        let pne = false;
        let addr_str = '';
        if (addr.address_1) {
            addr_str += addr.address_1;
            pne = true;
        }
        if (addr.address_2) {
            if (pne) addr_str += ', ';
            addr_str += addr.address_2;
            pne = true;
        }
        if (addr.city) {
            if (pne) addr_str += ', ';
            addr_str += addr.city;
        }
        return addr_str;
    }

}
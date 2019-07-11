export default class Filters{

    static install(Vue){
        Vue.filter('price', val => {
            if(!val) return '';
            const amt = parseFloat(val);
            return amt.toFixed(2) + ' \u20B9';
        });
    }

}
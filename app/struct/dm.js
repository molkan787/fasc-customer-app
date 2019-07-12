import dataFetcher from './dataFetcher';
import * as appSettings from 'application-settings';

export default class DM{

    static install(Vue){
        Vue.prototype.$dm = this;
    }

    static setup(context){
        this.context = context;
        this.productsMapped = context.state.productsMapped;
        this.productsList = context.state.productsList;
        dataFetcher.setup(context);
        this.loadSettings();
    }

    static loadSettings(){
        const sets = this.context.state.baseFetchParams;
        sets.sessionId = appSettings.getString('sessionId') || '';
        sets.storeId = appSettings.getNumber('storeId') || 0;
        sets.lang = appSettings.getNumber('lang') || 1;

        this.alreadyLaunched = appSettings.getBoolean('launched') || false;

        console.log('storeId:', sets.storeId);
        console.log('alreadyLaunched:', this.alreadyLaunched);
    }

    static saveSettings() {
        const sets = this.context.state.baseFetchParams;
        appSettings.setString('sessionId', sets.sessionId);
        appSettings.setNumber('storeId', parseInt(sets.storeId));
        appSettings.setNumber('lang', parseInt(sets.lang));
        appSettings.setString('orderPhone', this.context.state.contactInfo.order_phone);
    }

    static setLaunchedFlag(){
        appSettings.setBoolean('launched', true);
        this.alreadyLaunched = true;
        console.log('Launchd flag setted');
    }

    // ----------------------------------

    static async getProducts(filters){
        try {
            const data = await dataFetcher.fetch('product/list&side=client', filters);
            const products = data.data.items;
            this._cacheProducts(products);
            return data.data;
        } catch (error) {
            throw 'NET_ERROR';
        }
    }

    static async loadAsd() {
        try {
            const resp = await dataFetcher.fetch('asd');
            this._cacheAsdData(resp.data);
            return resp.data;
        } catch (error) {
            console.log('loadAsd Error', error)
            throw error;
        }
    }

    static async loadProduct(pid){
        try {
            const resp = await dataFetcher.fetch('product/info&product_id=' + pid);
            return resp.data;
        } catch (error) {
            throw 'NET_ERROR';
        }
    }

    // ===================================

    static _cacheProducts(products){
        const pm = this.productsMapped;
        for(let product of products){
            pm[product.product_id] = product;
        }
    }

    static _cacheAsdData(data){
        const state = this.context.state;
        const cats = data.cats;
        state.categoriesMapped = cats;
        let _cats = [];
        for (let id in cats) {
            if (!cats.hasOwnProperty(id)) continue;
            _cats.push(cats[id]);
        }
        state.categories = _cats.sort((a, b) => parseInt(a.sort_order) - parseInt(b.sort_order));
        state.banners = data.banners;
        state.gls = data.gls;
        state.baseFetchParams.sessionId = data.session_id;
        state.baseFetchParams.storeId = data.store_id;
        state.cityNames = data.city_names;
        
        state.customer = data.customer;
        state.customerAddresses = data.addresses;
        state.contactInfo = data.contact_info;
        state.bsd = data.bsd;

        this.saveSettings();
    }

}
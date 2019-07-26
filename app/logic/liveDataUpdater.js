import dataFetcher from '../struct/dataFetcher';
import Config from '../struct/config';
export default class LiveDataUpdater{

    static setup(context){
        this.context = context;
        this.state = context.state;
        this.lastUpdateTime = 0;
        this.timer = 0;
    }

    static setLastUpdateTime(time){
        this.lastUpdateTime = parseInt(time);
    }

    static start(){
        this.reset();
        this.do();
    }

    static stop(){
        this.reset();
    }

    static reset(){
        this.stopTimer();
    }

    static stopTimer(){
        clearTimeout(this.timer);
    }

    static scheduleCheck(){
        this.stopTimer();
        this.timer = setTimeout(() => {
            this.do();
        }, Config.liveDataUpdateInterval);
    }

    // ======================================

    static async do(){
        try {
            const data = await this.fetchData();
            this.lastUpdateTime = data.time;
            console.log(JSON.stringify(data));
            this.patchData(data);
        } catch (error) {
            
        }
        this.scheduleCheck();
    }

    static async fetchData(){
        const query = `asd/liveUpdate&time=${this.lastUpdateTime}&pids=77,60`;
        const resp = await dataFetcher.fetch(query);
        if (resp.status == 'OK') {
            return resp.data;
        } else {
            throw resp.error_code;
        }
    }

    // --------------------------------------

    static patchData(data){
        this._patchBSD(data.bsd);
        this._patchProducts(data.products);
    }

    static _patchProducts(products){
        const counts = this.state.cart.counts;
        const mapped = this.state.productsMapped;
        for (let _p of products){
            const pid = _p.product_id;
            const p = mapped[pid];
            if(!p) continue;
            p.quantity = _p.quantity;
            p.price = _p.price;
            const qty = parseInt(_p.quantity);
            if (typeof counts[pid] == 'number' && counts[pid] > qty){
                counts[pid] = qty;
            }

        }
        this.context.dispatch('updateCartCount');
    }

    static _patchBSD(_bsd){
        const bsd = this.state.bsd;
        bsd.timing_from = _bsd.timing_from;
        bsd.timing_to = _bsd.timing_to;
        bsd.timing_slot = _bsd.timing_slot;
        bsd.min_total = _bsd.min_total;
        bsd.fast_del_cost = _bsd.fast_del_cost;
    }


}
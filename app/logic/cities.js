import DataFetcher from '../struct/dataFetcher';
export default class Cities{

    static init(context){
        this.context = context;
    }

    static selectStore(cityId, regionId){
        const cid = regionId || cityId;
        const store = this.data.stores.find(store => store.city_id == cid);
        console.log(store)
        if(store){
            this.context.state.baseFetchParams.storeId = parseInt(store.store_id);
            this.context.state.baseFetchParams.ssi = true;
            return true;
        }else{
            return false;
        }
    }

    static async loadData(){
        const resp = await DataFetcher.fetch('asd/sas');
        if(resp.status == 'OK'){
            const prop = 'name_' + this.context.state.baseFetchParams.lang;
            const cities = resp.data.cities;
            resp.data.cities = cities.sort((a, b) => {
                if (a[prop] < b[prop]) return -1;
                if (a[prop] > b[prop]) return 1;
                return 0;
            });
            this.data = resp.data;
            return resp.data.cities;
        }else{
            throw resp.error_code;
        }
    }

}
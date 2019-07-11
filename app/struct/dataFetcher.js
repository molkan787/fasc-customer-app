import axios from 'axios';
import config from './config';
import utils from './utils';

export default class DataFetcher{

    static setup(context){
        this.baseParams = context.state.baseFetchParams;
    }

    static fetch(path, params){
        return new Promise((resolve, reject) => {
            axios.get(this.buildQueryUrl(path, params))
            .then(resp => {
                resolve(resp.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    static post(path, data){
        return new Promise((resolve, reject) => {
            axios.post(this.buildQueryUrl(path), this._ObjectToFormData(data))
            .then(resp => {
                resolve(resp.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    static buildQueryUrl(path, params){
        const { sessionId, apiToken, storeId, lang } = this.baseParams;
        let url = utils.stringFormat(config.apiBaseURL, storeId, apiToken, lang, sessionId);
        url += path;
        url += utils.jsonToGetParams(params);
        return url;
    }

    static _ObjectToFormData(obj){
        const form_data = new FormData();
        for(let k in obj){
            form_data.append(k, obj[k]);
        }
        return form_data;
    }

}
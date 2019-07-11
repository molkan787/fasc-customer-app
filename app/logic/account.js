import * as Facebook from "nativescript-facebook";
import DataFetcher from '../struct/dataFetcher';
import DM from '../struct/dm';
export default class Account{

    static init(context){
        this.context = context;
        this.state = this.context.state;
    }

    static async register(data){
        const resp = await DataFetcher.post('csc/register', data);
        if(resp.status == 'OK'){
            return resp.data;
        }else{
            throw resp.error_code;
        }
    }

    static async login(data) {
        const resp = await DataFetcher.post('csc/login', data);
        if (resp.status == 'OK') {
            return resp.data;
        } else {
            throw resp.error_code;
        }
    }

    static async verify(data){
        const resp = await DataFetcher.post('csc/verify', data);
        if (resp.status == 'OK') {
            this._cacheCustomerData(resp.data);
            await DM.loadAsd();
            return resp.data;
        } else {
            throw resp.error_code;
        }
    }

    static fbLogin(){
        return new Promise((resolve, reject) => {
            Facebook.login((err, data) => {
                if(err){
                    reject(err);
                }else{
                    this.socialLogin('fb', data.token)
                    .then(resp => {

                        this._cacheCustomerData(resp.data);
                        DM.loadAsd()
                        .then(() => {
                            resolve(resp.data);
                        })
                        .catch(_err => reject(_err));

                    })
                    .catch(_err => {
                        reject(_err);
                    });
                }
            });
        });
    }

    static async socialLogin(platform, token){
        const data = {
            platform,
            token,
        }
        return await DataFetcher.post('csc/social_login', data);
    }

    static logout(){
        this.state.baseFetchParams.sessionId = '';
        this.state.customer = null;
        this.state.customerAddresses = [];
        DM.saveSettings();
    }

    static async deleteAddress(addr_id) {
        await DataFetcher.post('address/delete', { addr_id });
        const index = this.context.state.customerAddresses.findIndex(addr => addr.address_id == addr_id );
        this.context.state.customerAddresses.splice(index, 1);
    }

    static async addAddress(data){
        const resp = await DataFetcher.post('address/add', data);
        if(resp.status == 'OK'){
            const addrData = resp.data;
            this.context.state.customerAddresses.push(addrData);
            return this.context.state.customerAddresses.length - 1; // Return the index of the new address
        }else{
            throw resp.error_code;
        }
    }


    // =====================================
    static _cacheCustomerData(customer){
        this.state.customer = customer.data;
        this.state.customerAddresses = customer.addresses;
    }

}
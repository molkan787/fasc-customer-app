import { screen } from "platform";
import StaticData from './staticData';
const ModalPicker = require("nativescript-modal-datetimepicker")
    .ModalDatetimepicker;
const _picker = new ModalPicker();

export default class Utils{

    static install(Vue){

        Vue.prototype.$alert = (msg) => alert({
            title: StaticData.get('companyName'),
            message: msg,
            okButtonText: 'OK',
        });

        Vue.prototype.$confirm = (msg) => confirm({
            title: StaticData.get('companyName'),
            message: msg,
            okButtonText: 'Yes',
            cancelButtonText: 'No',
        });

        Vue.prototype.$getViewSize = () => ({
            width: screen.mainScreen.widthDIPs,
            height: screen.mainScreen.heightDIPs
        });

        Vue.prototype.$sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

        Vue.prototype.$selectDate = (params) => new Promise((resolve, reject) => {
            if(!params) params = {};
            const _params = {
                title: params.title || 'Select date',
                theme: "light"
            };
            if (params.maxDate) {
                _params.maxDate = (params.maxDate == 'now') ? new Date() : params.maxDate;
            }
            if (params.minDate) {
                _params.minDate = (params.minDate == 'now') ? new Date() : params.minDate;
            }

            _picker.pickDate(_params)
                .then(result => {
                    const localGetter = function (){
                        const d = new Date(result.year, result.month - 1, result.day)
                        return d.toLocaleDateString();
                    }

                    const basicGetter = function (){
                        return result.year + '-' + result.month + '-' + result.day;
                    }
                    
                    result.toLocal = localGetter;
                    result.toBasic = basicGetter;
                    resolve(result);
                })
                .catch(error => {
                    result(null);
                });
        });

    }

}
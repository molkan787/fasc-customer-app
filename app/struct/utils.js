export default class Utils{

    static stringFormat(str){
        let result = str;
        for(let i = 1; i < arguments.length; i++){
            result = result.replace(`{%${i}}`, arguments[i]);
        }
        return result;
    }

    static jsonToGetParams(params){
        let result = '';
        for(let name in params){
            if(!params.hasOwnProperty(name)) continue;
            result += `&${name}=${encodeURI(params[name])}`;
        }
        return result;
    }

}
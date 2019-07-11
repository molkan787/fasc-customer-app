const data = {
    companyName: 'WalkOn Retail',
}
export default class StaticData{

    static install(Vue){
        Vue.prototype.$getStaticData = (name) => {
            return data[name] || null;
        }
    }

    static get(name){
        return data[name] || null;
    }

}
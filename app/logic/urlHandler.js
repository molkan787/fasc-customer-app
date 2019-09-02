import vRouter from '../struct/vRouter';
export default class urlHandler{

    static handle(appURL){
        const path = appURL.path;
        console.log('Handling URL: ' + path)
        const pid = path.split('/p/')[1];
        if(!pid) return;
        
        sleep(500).then(() => {
            vRouter.navigateTo('customerProductsLost', { ids: pid, productsTitle: true});
        })

    }

}
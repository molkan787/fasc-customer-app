import { topmost } from 'ui/frame';
export default class vRouter{

    static install(Vue, { store }){
        this.Vue = Vue;
        this.store = store;
        this.data = store.state.router;
        this.routesMap = {};
        this.routesGroups = {
            '1': [],
            '2': [],
            '3': [],
        }
        Vue.set(this, 'routes', []);

        Vue.prototype.$goTo = (pageName, params, options) => {
            this.navigateTo(pageName, params, options);
        };
        Vue.prototype.$goBack = () => {
            this.goBack();
        };
        Vue.prototype.$addRoute = (route) => {
            this.routes.push(route);
        };
        Vue.prototype.$currentRoute = () => {
            return this.data.current;
        };

        Vue.prototype.$justNavigate = (comp) => {
            this.justNavigate(comp);
        };

        Vue.prototype.$vRoutes = this.getRoutes;
        Vue.prototype.$vRoutesGroups = this.getRoutesGroups;
    }

    static navigateTo(pageName, params, options){
        if (pageName == 'cart' && this.data.current == pageName) return;
        if (pageName == 'account' && !this.store.state.customer){
            pageName = 'login';
            params = {tab: 'login'};
        }
        const modal = options && options.modal;
        const history = (!options || typeof options.history != 'boolean' || !options.history) && !modal;
        const animation = (options && options.animation) ? options.animation : 'slideLeft';
        const route = this.routesMap[pageName];
        if (route) {
            this.data.current = pageName;
            if (history){
                this.data.history.push({
                    name: pageName,
                    params
                });
            }
            
            if(modal){
                topmost().currentPage.__vuePageRef__.$showModal(route.comp, {
                    props: params,
                }, null, true);
            }else{
                topmost().currentPage.__vuePageRef__.$navigateTo(route.comp, {
                    transition: {
                        name: animation,
                        duration: 250,
                        curve: 'easeInOut'
                    },
                    props: params,
                });
            }
        }
    }

    static goBack() {
        if (this.data.history.length < 2) return;
        this.data.history.pop();
        const previous = this.data.history[this.data.history.length-1];
        const route = this.routesMap[previous.name];
        this.data.current = previous.name;
        topmost().currentPage.__vuePageRef__.$navigateTo(route.comp, {
            transition: {
                name: 'slideRight',
                duration: 250,
                curve: 'easeInOut'
            }
        });
    }

    static justNavigate(comp){
        topmost().currentPage.__vuePageRef__.$navigateTo(comp, {
            transition: {
                name: 'fade',
                duration: 250,
                curve: 'easeInOut'
            }
        });
    }

    static addToHistory(route){
        this.data.history.push(route);
    }

    static addRoute(route){
        this.routesMap[route.name] = route;
        this.routes.push(route);
        if (!route.hidden && route.group && this.routesGroups[route.group]){
            this.routesGroups[route.group].push(route);
        }
    }

    static get getRoutes() {
        return vRouter.routes;
    }
    static get getRoutesGroups() {
        return vRouter.routesGroups;
    }

}
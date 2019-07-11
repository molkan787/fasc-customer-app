import Vue from 'vue';
import Vuex from 'vuex';
import Struct from './struct/index';
import Helper from './logic/helper';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    baseFetchParams: {
      sessionId: '',
      apiToken: 'key',
      storeId: 0,
      lang: 1,
    },
    cityNames: {},
    customer: null,
    customerAddresses: [],
    contactInfo: {},
    bsd: {},
    gls: {},

    // =========================================
    router: {
      current: 'home',
      history: [],
    },
    // =========================================
    banners: [],

    productsMapped: {},
    productsList: [],

    categories: [],
    categoriesMapped: {},
    // =========================================

    cart: {
      productsTotal: 0,
      total: 0,
      count: 0,
      counts: {

      },
      items: [],

      order: {
        deliveryAddress: 0,
        deliveryDate: null,
        deliveryTime: 'regular',
        paymentMethod: 'cod',
      }
    },

    pagesCache: {
      cartShipping: {
        deliveryAddressString: '',
      }
    }
    
  },

  mutations: {

  },
  actions: {
    setup(context){
      Struct.setup(context);
      Vue.prototype.$langId = function (){
        return context.state.baseFetchParams.lang;
      }
      Vue.prototype.$customer = function () {
        return context.state.customer;
      }
    },

    setCartDeliveryTime(context, dt) {
      const state = context.state;
      state.cart.order.deliveryTime = dt;
      context.dispatch('updateCartTotal');
    },

    updateCartCount(context){
      const state = context.state;
      const items = [];
      const counts = state.cart.counts;
      let total = 0;
      let count = 0;
      for(let pid in counts){
        if(!counts.hasOwnProperty(pid)) continue;
        const pcc = counts[pid];
        if(pcc){
          count++;
          const prt = state.productsMapped[pid];
          items.push(prt);
          const price = Helper.getFinalPrice(prt);
          const localTotal = price * pcc;
          total += localTotal;
        }
      }
      state.cart.items = items;
      state.cart.count = count;
      state.cart.productsTotal = total;
      context.dispatch('updateCartTotal');
    },

    updateCartTotal({ state }){
      let total = state.cart.productsTotal;
      if (total > 0 && state.cart.order.deliveryTime == 'fast'){
        total += parseFloat(state.bsd.fast_del_cost);
      }
      state.cart.total = total;
    },

    clearCart({state}){
      state.cart.items = [];
      state.cart.counts = {};
      state.cart.count = 0;
      state.cart.total = 0;
      state.cart.productsTotal = 0;
    }
  }
});

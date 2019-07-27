import vRouter from '../struct/vRouter';
import CartLogic from './cart';
import AccountLogic from './account';
import CitiesLogic from './cities';

import ProductInfoPage from '../components/pages/ProductInfo';

export default class Logic{

    static setup(store){
        this.store = store;
        CitiesLogic.init(store);
        CartLogic.init(store);
        AccountLogic.init(store);

        vRouter.addRoute({
            name: 'home',
            text: 'Home',
            icon: 'home',
            comp: 'HomePage',
            group: 1,
        });
        
        vRouter.addRoute({
            name: 'cart',
            text: 'My Cart',
            icon: 'cart',
            comp: 'CartPage',
            group: 1,
        });

        vRouter.addRoute({
            name: 'account',
            text: 'My Account',
            icon: 'user',
            comp: 'AccountPage',
            group: 1,
        });

        vRouter.addRoute({
            name: 'orders',
            text: 'My Orders',
            icon: 'package',
            comp: 'OrdersPage',
            group: 1,
        });

        vRouter.addRoute({
            name: 'fav',
            text: 'My Favorites',
            icon: 'favorite',
            comp: 'FavoritesPage',
            group: 1,
        });

        vRouter.addRoute({
            name: 'order_on_phone',
            text: 'Order on Phone',
            icon: 'phone',
            comp: 'OrderOnPhonePage',
            group: 1,
        });

        vRouter.addRoute({
            name: 'order_on_whatsapp',
            text: 'Order on WhatsApp',
            icon: 'whatsapp',
            comp: 'OrderOnWhatsappPage',
            group: 1,
        });
        

        vRouter.addRoute({
            name: 'contact',
            text: 'Contact us',
            icon: 'mail',
            comp: 'ContactPage',
            group: 2,
        });
        vRouter.addRoute({
            name: 'companyInfo',
            text: 'About company',
            icon: 'info',
            comp: 'CompanyInfoPage',
            group: 2,
        });

        vRouter.addRoute({
            name: 'products',
            text: 'Products',
            icon: 'cart',
            comp: 'ProductsPage',
            group: 3,
            hidden: true,
        });

        vRouter.addRoute({
            name: 'search',
            text: 'Search',
            icon: 'search',
            comp: 'SearchPage',
            group: 3,
            hidden: true,
        });

        vRouter.addRoute({
            name: 'customerProductsLost',
            text: 'Promotion',
            icon: 'cart',
            comp: 'CustomProductsListPage',
            group: 3,
            hidden: true,
        });

        vRouter.addRoute({
            name: 'orderInfo',
            text: 'Order details',
            icon: 'cart',
            comp: 'OrderInfoPage',
            group: 3,
            hidden: true,
        });

        vRouter.addRoute({
            name: 'addAddress',
            text: 'Add Address',
            icon: 'cart',
            comp: 'AddAddressPage',
            group: 3,
            hidden: true,
        });

        vRouter.addRoute({
            name: 'productInfo',
            text: 'Product',
            icon: 'cart',
            comp: ProductInfoPage,
            group: 3,
            hidden: true,
        });

        vRouter.addRoute({
            name: 'login',
            text: 'Account',
            comp: 'LoginPage',
            group: 3,
            hidden: true,
        });

    }

}
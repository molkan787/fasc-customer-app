import vRouter from '../struct/vRouter';
import DM from '../struct/dm';

import CitySelection from '../components/pages/CitySelection';
import WelcomeScreen from '../components/pages/WelcomeScreen';
import LoadingScreen from '../components/pages/LoadingScreen';
import HomePage from '../components/pages/Home';
import AccountPage from '../components/pages/Account';

export default class Starter{

    static install(Vue, store){
        Vue.prototype.$starter = this;
        this.init(store);
    }

    static init(context) {
        console.log('Starter inited!')
        vRouter.addToHistory({ name: 'home', params: null });
        this.state = context.state;
    }

    static nextStep(currentStep){
        console.log('Step:', currentStep);
        if(currentStep == 'asd')
            this.stepAfterAsd();
        else if (currentStep == 'citySelection')
            this.stepAfterCitySelection();
        else if (currentStep == 'welcome')
            this.stepAfterWelcome();
    }

    // ---------------------------

    static getFirstPage(){
        // return OrdersPage;
        if(!DM.alreadyLaunched){
            return LoadingScreen;
        } else if (!this.state.baseFetchParams.storeId) {
            return CitySelection;
        } else {
            return LoadingScreen;
        }
    }

    static stepAfterAsd(){
        if (!DM.alreadyLaunched) {
            vRouter.justNavigate(WelcomeScreen);
        } else if (!this.state.baseFetchParams.storeId) {
            vRouter.justNavigate(CitySelection);
        } else {
            vRouter.justNavigate(HomePage);
            // vRouter.justNavigate(AccountPage);
        }
    }

    static stepAfterCitySelection(){
        vRouter.justNavigate(LoadingScreen);
    }

    static stepAfterWelcome(){
        DM.setLaunchedFlag();
        vRouter.justNavigate(CitySelection);
    }

}
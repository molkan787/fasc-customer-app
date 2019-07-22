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
        return AccountPage;
        if(!DM.alreadyLaunched){
            console.log('First page: LoadingScreen');
            return LoadingScreen;
        } else if (!this.state.baseFetchParams.storeId) {
            console.log('First page: CitySelection');
            return CitySelection;
        } else {
            console.log('First page: LoadingScreen');
            return LoadingScreen;
        }
    }

    static stepAfterAsd(){
        if (!DM.alreadyLaunched) {
            console.log('AfterAsd: WelcomeScreen');
            vRouter.justNavigate(WelcomeScreen);
        } else if (!this.state.baseFetchParams.storeId) {
            console.log('AfterAsd: CitySelection');
            vRouter.justNavigate(CitySelection);
        } else {
            console.log('AfterAsd: HomePage');
            vRouter.justNavigate(HomePage);
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
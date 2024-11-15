import Vue from 'nativescript-vue'

// import WelcomeScreen from './components/pages/WelcomeScreen';
import MPage from './components/templates/page';
import Spinner from './components/templates/Spinner';
import ImagePlaceholder from './components/elements/Placeholder';
import ShadowBar from './components/templates/ShadowBar';
import ShadowPanel from './components/templates/ShadowPanel';
import Card from './components/templates/Card';
import CircleButton from './components/templates/CircleButton';
import SolidButton from './components/templates/SolidButton';
import Config from './config';

import FacebookPlugin from "nativescript-facebook/vue";
import Pager from 'nativescript-pager/vue';
import store from './store';
import vRouter from './struct/vRouter';
import UtilsPlugin from './utilsPlugin';
import Filters from './struct/filters';
import DM from './struct/dm';
import DynamicTexts from './logic/dynamicTexts';
import StaticData from './staticData';

import urlHandler from './logic/urlHandler';
import { handleOpenURL } from 'nativescript-urlhandler';

handleOpenURL(appURL => urlHandler.handle(appURL));

import VueDevtools from 'nativescript-vue-devtools'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)
Vue.registerElement('CardView', () => require('nativescript-cardview').CardView);
Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem);
Vue.registerElement('Ripple', () => require('nativescript-ripple').Ripple);
Vue.registerElement('DropDown', () => require("nativescript-drop-down/drop-down").DropDown);
// Vue.registerElement("FilterableListpicker", () => require("nativescript-filterable-listpicker").FilterableListpicker);
Vue.registerElement(
  'PullToRefresh',
  () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh
);
Vue.registerElement('CheckBox', () => require('@nstudio/nativescript-checkbox').CheckBox,
  {
    model: {
      prop: 'checked',
      event: 'checkedChange'
    }
  }
);

Vue.component('MPage', MPage);
Vue.component('Spinner', Spinner);
Vue.component('ShadowBar', ShadowBar);
Vue.component('ShadowPanel', ShadowPanel);
Vue.component('Card', Card);
Vue.component('CircleButton', CircleButton);
Vue.component('SolidButton', SolidButton);
Vue.component('ImagePlaceholder', ImagePlaceholder);
Vue.use(Pager);

Vue.use(FacebookPlugin);
Vue.use(vRouter, { store });
Vue.use(UtilsPlugin);
Vue.use(Filters);
Vue.use(DM);
Vue.use(DynamicTexts, store);
Vue.use(StaticData);

store.dispatch('setup');

const application = require("tns-core-modules/application");
import { init } from 'nativescript-facebook';

application.on(application.launchEvent, function (args) {
  init(Config.fbAppId);
});

application.android.on(application.AndroidApplication.activityBackPressedEvent, (args) => {
  args.cancel = true;
  vRouter.goBack();
});

// Starter ++++++
import Starter from './logic/starter';
Vue.use(Starter, store);


Vue.prototype.$store = store;

new Vue({
  store,
  render: h => h('frame', [h(Starter.getFirstPage())])
}).$start()

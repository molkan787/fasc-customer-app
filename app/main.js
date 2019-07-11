import Vue from 'nativescript-vue'

import MPage from './components/templates/page';
import Spinner from './components/templates/Spinner';
import ImagePlaceholder from './components/elements/Placeholder';
import ShadowBar from './components/templates/ShadowBar';
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

import VueDevtools from 'nativescript-vue-devtools'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// foo
Vue.config.silent = true; //(TNS_ENV === 'production')

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)
Vue.registerElement('CardView', () => require('nativescript-cardview').CardView);
Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem);
Vue.registerElement('Ripple', () => require('nativescript-ripple').Ripple);
Vue.registerElement('ShadowedLabel', () => require('nativescript-shadowed-label').ShadowedLabel);
Vue.registerElement('DropDown', () => require("nativescript-drop-down/drop-down").DropDown);
Vue.registerElement('CheckBox', () => require('nativescript-checkbox').CheckBox, {
  model: {
    prop: 'checked',
    event: 'checkedChange'
  }
});

Vue.component('MPage', MPage);
Vue.component('Spinner', Spinner);
Vue.component('ShadowBar', ShadowBar);
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

// New era
import Starter from './logic/starter';
Starter.init(store);

new Vue({
  store,
  render: h => h('frame', [h(Starter.getFirstPage())])
}).$start()
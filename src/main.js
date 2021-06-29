import Vue from "vue";
import App from "./App";
import store from "./store";
import { network } from "./common/business/network";
import { toast, throttlePageHref } from "./common/business/tool";

Vue.prototype.$store = store;
Vue.prototype.$network = network;
Vue.prototype.$toast = toast;
Vue.prototype.$pageHref = throttlePageHref;
Vue.config.productionTip = false;
App.mpType = "app";

const app = new Vue({
  ...App
});
app.$mount();

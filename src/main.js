import Vue from "vue";
import App from "./App";
import store from "./store";
import {
  network
} from "./common/business/network";
import {
  toast
} from "./common/business/tool";
import {
  pageHref,
  throttlePageHref
} from "@/common/business/pageHref";

Vue.prototype.$store = store;
Vue.prototype.$network = network;
Vue.prototype.$toast = toast;
Vue.prototype.$pageHref = throttlePageHref;
Vue.prototype.$pageNowHref = pageHref;
App.mpType = "app";

const app = new Vue({
  ...App
});
app.$mount();

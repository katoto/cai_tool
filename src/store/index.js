import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLog: undefined,
    showLoading: true, // 自定义loading 因为原生loading & toast 提示冲突
    loadingFlag: "0" // 用于loading & toast 提示冲突
  },
  mutations: {
    setIsLog(state, data) {
      state.isLog = data;
    },
    setLoadingFlag(state, data) {
      state.loadingFlag = data;
    },
    setLoading(state, data) {
      state.showLoading = !!data;
    }
  },
  actions: {}
});

export default store;

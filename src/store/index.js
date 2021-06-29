import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLog: undefined,
    showLoading: true, // 自定义loading 因为原生loading & toast 提示冲突
    loadingFlag: "0", // 用于loading & toast 提示冲突

    latitude: "", // 纬度
    longitude: "", // 经度
    wxUserProfile: {}, // 微信授权信息
    userInfo: undefined, // 用户信息
    authorizePhone: "" // 把检查是否授权提前
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
  actions: {
    // jump2ShopMini({ commit, state }, parameters) {}
  }
});

export default store;

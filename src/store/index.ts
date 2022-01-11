import { createStore } from "vuex";

export default createStore({
  state: {
    loading: false,
    toast: null,
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload;
    },

    toastOpen(state, payload) {
      state.toast = payload;
    },
  },
  actions: {
    loadingStart() {
      this.commit("loading", true);
    },
    loadingStop() {
      this.commit("loading", false);
    },
    //
    showError(store, message) {
      this.commit("toastOpen", { message, type: "error" });
    },
    showInfo(store, message) {
      this.commit("toastOpen", { message, type: "info" });
    },
  },
  modules: {},
});

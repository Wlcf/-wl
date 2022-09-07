import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    tokenObj: {}
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    }
  },
  actions: {},
  modules: {}
})

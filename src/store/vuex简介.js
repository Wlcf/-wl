import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// vuex声明变量
//  - 声明： 在state里
//  - 取：$store.state.属性名

// vuex修改数据
// - 自产自销
// -规范：函数命名采用大驼峰
// -mutations:函数
// -mutations里的函数的参数
//  - state:数据

// 触发mutations里面的方法
//  - this.$store.commit('mutation方法名字', 参数)
export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    bigNum(state) {
      return state.count * 10
    }
  },
  mutations: {
    SET_COUNT(state, payload) {
      state.count += payload
    }
  },
  actions: {},
  modules: {}
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    currentID: "",
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    changeCurrentID(state, id) {
      state.currentID = id
    }
  },
  actions: {
  },
  modules: {
  }
})

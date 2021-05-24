import { createStore } from 'vuex';


const store = createStore({
  state () {
    return {
      count: 5,
      currentRoute: 'user-list-page',
      // currentRoute: 'messages-page',
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    changePage(state, route) {
      state.currentRoute = route
    },
  },
  actions: {
    changePage({ commit }, route) {
      commit('changePage', route)
    }
  },
  getters: {
    getCurrentRoute(state) {
      return state.currentRoute
    }
  }
})

export default store

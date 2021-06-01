

const state = () => {
  return {
    currentRoute: 'user-list-page',
    // currentRoute: 'messages-page',
  }
}

const mutations = {
  changePage(state, route) {
    state.currentRoute = route
  },
};
const actions = {
  changePage({ commit }, route) {
    commit('changePage', route)
  }
};
const getters = {};


export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};

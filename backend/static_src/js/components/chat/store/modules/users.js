import api from '../../api';


const state = () => {
  return {
    interlocutors: [],
    currentUserId: '1',
    currentInterlocutor: {},
  }
};

const mutations = {
  initInterlocutors(state, interlocutors) {
    state.interlocutors = interlocutors
  },
  setCurrentInterlocutor(state, currentInterlocutor) {
    state.currentInterlocutor = currentInterlocutor
  },
  clearCurrentInterlocutor(state) {
    state.currentInterlocutor = {}
  }
};

const actions = {
  initInterlocutors({ commit, dispatch, rootState }, currentUserId) {
    api.getInterlocutors((interlocutors) => {
      commit('initInterlocutors', interlocutors)
      dispatch('initMessages', currentUserId)
    }, currentUserId)
  },
  setCurrentInterlocutor({ commit }, currentInterlocutor) {
    commit('setCurrentInterlocutor', currentInterlocutor)
  },
  clearCurrentInterlocutor({ commit }) {
    commit('clearCurrentInterlocutor')
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

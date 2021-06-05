import api from '../../api';


const state = () => {
  return {
    currentUserId: '1',
    interlocutors: [],
    currentInterlocutor: {},
  };
};

const mutations = {
  initInterlocutors(state, interlocutors) {
    state.interlocutors = interlocutors;
  },
  setCurrentInterlocutor(state, currentInterlocutor) {
    state.currentInterlocutor = currentInterlocutor;
  },
};

const actions = {
  initInterlocutors({ commit, dispatch, rootState }, currentUserId) {
    api.getInterlocutors((interlocutors) => {
      commit('initInterlocutors', interlocutors);
      dispatch('initMessages', currentUserId);
    }, currentUserId);
  },
  setCurrentInterlocutor({ commit }, currentInterlocutor) {
    commit('setCurrentInterlocutor', currentInterlocutor);
  },
};

const getters = {};


export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};

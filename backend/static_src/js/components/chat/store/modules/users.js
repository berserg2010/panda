import api from '../../api';


const state = () => {
  return {
    // currentUserId: window.currentUserId,
    interlocutors: [],
    currentChatId: '',
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
  setCurrentChatId(state, currentChatId) {
    state.currentChatId = currentChatId;
  },
};

const actions = {
  initInterlocutors({ commit, dispatch }) {
    api.getInterlocutors((interlocutors) => {
      commit('initInterlocutors', interlocutors);
      // dispatch('initMessages', currentUserId);
    });
  },
  setCurrentInterlocutor({ commit }, currentInterlocutor) {
    commit('setCurrentInterlocutor', currentInterlocutor);
  },
  setCurrentChatId({ commit }, currentChatId) {
    commit('setCurrentChatId', currentChatId);
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

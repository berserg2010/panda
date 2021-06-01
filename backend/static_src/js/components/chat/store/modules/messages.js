import api, { filterMessages } from '../../api';


const state = () => {
  return {
    messages: [],
  }
};

const mutations = {
  initMessages(state, messages) {
    state.messages = messages
  },
};

const actions = {
  initMessages({ commit }, currentUserId) {
    api.getMessages((messages) => {
      commit('initMessages', messages)
    }, currentUserId)
  },
};

const getters = {
  getMessages: (state) => (interlocutorId) => {
    return filterMessages(state.messages, interlocutorId)
  },
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};

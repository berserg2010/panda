import api, { filterMessages } from '../../api';


const state = () => {
  return {
    messages: [],
  };
};

const mutations = {
  initMessages(state, messages) {
    state.messages = messages;
  },
  addMessage(state, message) {
    state.messages.push(message);
  },
};

const actions = {
  initMessages({ commit }, currentUserId) {
    api.getMessages((messages) => {
      commit('initMessages', messages);
    }, currentUserId);
  },
  addMessage({ commit }, message) {
    commit('addMessage', message);
  },
};

const getters = {
  getMessages: (state) => (interlocutorId) => {
    return filterMessages(state.messages, interlocutorId);
  },
  getLastMessage: (state) => (interlocutorId) => {
    const messages = filterMessages(state.messages, interlocutorId);
    return messages[messages.length - 1];
  },
};


export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};

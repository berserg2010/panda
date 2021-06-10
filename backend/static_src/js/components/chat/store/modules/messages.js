import api from '../../api';


const state = () => {
  return {
    messages: {},
  };
};

const mutations = {
  initMessages(state, messages) {
    state.messages[messages['chat_id']] = messages.messages;
  },
  addMessage(state, message) {
    state.messages.push(message);
  },
};

const actions = {
  initMessages({ commit }, chatId) {
    api.getMessages((messages) => {
      commit('initMessages', messages);
    }, chatId);
  },
  sendMessage({ commit }, data) {
    api.sendMessage(() => {
      // commit('addMessage', data);
    }, data)
  },
};

const getters = {
  getMessages: (state) => (chatId) => {
    return state.messages[chatId]
  },
  getLastMessage: (state) => (chatId) => {
    const message = state.messages[chatId];
    return message.messages[message.messages.length - 1];
  },
};


export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};

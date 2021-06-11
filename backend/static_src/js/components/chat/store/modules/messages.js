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
    const messages = state.messages
    if (message.chat_id in messages) {
      messages[message.chat_id].push(message.message)
    } else {
      state.messages[message.chat_id] = message.message;
    }
  },
};

const actions = {
  initMessages({ commit }, chatId) {
    api.getMessages((messages) => {
      commit('initMessages', messages);
    }, chatId);
  },
  sendMessage({ commit, rootState }, data) {
    api.sendMessage((message) => {
      commit('addMessage', {
        chat_id: rootState.users.currentChatId,
        message,
      })
    }, data)
  },
};

const getters = {
  getMessages: (state) => (chatId) => {
    return state.messages[chatId]
  },
  getLastMessage: (state) => (chatId) => {
    let last_message;
    const messages = state.messages;
    if (chatId in messages) {
      const chat_messages = messages[chatId];
      last_message = chat_messages[chat_messages.length - 1];
    }
    return last_message
  },
};


export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};

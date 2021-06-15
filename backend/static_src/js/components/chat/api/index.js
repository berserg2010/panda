import store from '../store';


const currentLocation = window.location;
const wsProtocol = currentLocation.protocol === 'https:' ? 'wss://' : 'ws://';
const wsURL = `${wsProtocol}${currentLocation.host}/ws/lk/chat/`;

const wsChat = new WebSocket(wsURL);


wsChat.onclose = (ev) => {
  console.info(`[close] Соединение закрыто, код=${ev.code}, причина=${ev.reason}`);
}

wsChat.onerror = (ev) => {
  console.info(`[error] ${ev.message}`);
};

wsChat.onmessage = (ev) => {
  const data = JSON.parse(ev.data);
  // console.info(`[${data.event}] Данные получены`, data);

  switch (data.event) {
    case 'get.interlocutors':
      store.commit('initInterlocutors', data.data);
      break;
    case 'get.messages':
      store.commit('initMessages', data.data);
      break;
    case 'set.message':
      store.commit('addMessage', data.data);
      break;
    default:
      console.info('Unknown message received :', data.event);
  }
};


export default {
  getInterlocutors({ event, data }) {
    wsChat.onopen = (ev) => {
      console.info(`[open] Соединение установлено`);

      wsChat.send(JSON.stringify({ event, data }));
    };
  },

  client({ event, data }) {
    wsChat.send(JSON.stringify({ event, data }));
  },
};



const currentLocation = window.location;
const wsProtocol = currentLocation.protocol === 'https:' ? 'wss://' : 'ws://';
const wsURL = `${wsProtocol}${currentLocation.host}/ws/lk/chat/`;

const ws = new WebSocket(wsURL);

ws.onclose = (ev) => {
  console.info(`[close] Соединение закрыто, код=${ev.code}, причина=${ev.reason}`)
}

ws.onerror = (ev) => {
  console.info(`[error] ${ev.message}`)
}


export default {
  getInterlocutors(cb) {
    ws.onopen = (ev) => {
      console.info('[open] Соединение установлено')

      ws.send(JSON.stringify({
        event: 'get.interlocutors',
        data: {},
      }));
    }

    ws.onmessage = (ev) => {
      console.info('[message] Данные получены')
      const data = JSON.parse(ev.data)
      console.info(data)
      cb(data.data)
    }
  },

  getMessages(cb, currentChatId) {
    ws.send(JSON.stringify({
      event: 'get.messages',
      data: { currentChatId },
    }));

    ws.onmessage = (ev) => {
      console.info('[message] Данные получены')
      const data = JSON.parse(ev.data)
      console.info(data)
      cb(data.data)
    }
  },

  sendMessage(cb, data) {
    ws.send(JSON.stringify({
      event: 'set.message',
      data,
    }));
  },
};

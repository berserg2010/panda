import { createStore } from 'vuex';

import chatPage from './modules/chatPage';
import users from './modules/users';
import messages from './modules/messages';


const debug = process.env.NODE_ENV !== 'production';

const store = createStore({
  modules: {
    chatPage,
    users,
    messages,
  },
  strict: debug,
});

export default store;

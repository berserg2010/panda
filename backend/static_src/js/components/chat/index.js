import { createApp } from 'vue';

import store from './store';
import Chat from './Chat.vue';


createApp(Chat)
  .use(store)
  .mount('#chat');

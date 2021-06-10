import { createApp, reactive } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import PerfectScrollbar from 'vue3-perfect-scrollbar';

import store from './store';
import Chat from './Chat.vue';


const app = createApp(Chat);

app
  .use(VueAxios, axios)
  .use(store)
  .use(PerfectScrollbar)
  .mount('#chat');

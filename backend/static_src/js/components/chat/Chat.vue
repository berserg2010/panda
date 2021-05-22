<script>
import { h } from 'vue';

import UserListPage from './UserListPage.vue';
import MessagesPage from './MessagesPage.vue';

const routes = {
  'user-list-page': UserListPage,
  'messages-page': MessagesPage,
}

export default {
  name: 'Chat',
  data() {
    return {
      currentRoute: 'user-list-page',
      // currentRoute: 'messages-page',
    }
  },
  computed: {
    CurrentComponent() {
      return routes[this.currentRoute]
    },
  },
  render() {
    return h(this.CurrentComponent)
  },
};
</script>

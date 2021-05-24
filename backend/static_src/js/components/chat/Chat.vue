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
  computed: {
    CurrentComponent() {
      return routes[this.$store.getters.getCurrentRoute]
    },
  },
  render() {
    return h(this.CurrentComponent)
  },
};
</script>

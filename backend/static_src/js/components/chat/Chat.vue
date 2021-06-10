<template>
  <transition name="fade" mode="out-in">
    <UserListPage v-if="currentRoute === 'user-list-page'" :interlocutors="interlocutors" />
    <MessagesPage v-else />
  </transition>
</template>


<script>
import { mapState } from 'vuex';

import UserListPage from './UserListPage.vue';
import MessagesPage from './MessagesPage.vue';


const routes = {
  'user-list-page': UserListPage,
  'messages-page': MessagesPage,
};

export default {
  name: 'Chat',
  components: {
    UserListPage,
    MessagesPage,
  },
  computed: {
    ...mapState({
      currentRoute: (state) => state.chatPage.currentRoute,
      interlocutors: (state) => state.users.interlocutors,
    }),
  },
  created() {
    this.$store.dispatch('initInterlocutors');
  },
};
</script>

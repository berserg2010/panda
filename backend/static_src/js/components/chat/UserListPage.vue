<template>
  <perfect-scrollbar class="chat-wrapper chat-group">
    <UserListItem
      v-for="interlocutor in interlocutors"
      :key="interlocutor.id"
      :user="interlocutor"
    />
  </perfect-scrollbar>
</template>

<script>
import { mapState } from 'vuex';

import UserListItem from './UserListItem.vue';


export default {
  name: 'UserList',
  components: {
    UserListItem,
  },
  computed: {
    ...mapState({
      interlocutors: (state) => state.users.interlocutors
    })
  },
};
</script>

<template>
  <div class="chat-wrapper">
    <div class="chat-message">
      <UserItem :user="currentInterlocutor" :for-chat="true" />

      <MessagesList :messages="getMessages" />

      <MessageInput />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import UserItem from './UserItem.vue';
import MessagesList from './MessagesList.vue';
import MessageInput from './MessageInput.vue';


export default {
  name: 'MessagesPage',
  components: {
    UserItem,
    MessagesList,
    MessageInput,
  },
  computed: {
    ...mapState({
      currentInterlocutor: (state) => state.users.currentInterlocutor,
      currentChatId: (state) => state.users.currentChatId,
    }),
    getMessages() {
      return this.$store.getters.getMessages(this.currentChatId);
    },
  },
};
</script>

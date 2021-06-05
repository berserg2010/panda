<template>
  <div class="chat-wrapper">
    <div class="chat-message">
      <!--  <textarea id="chat-log" cols="100" rows="20"></textarea>-->
      <!--  <label for="chat-message-input">Сообщение</label>-->
      <!--  <input id="chat-message-input" type="text">-->

      <!--  <input id="chat-message-submit" disabled type="button" value="Send">-->
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
    }),
    getMessages() {
      return this.$store.getters.getMessages(this.currentInterlocutor.id);
    },
  },
};
</script>

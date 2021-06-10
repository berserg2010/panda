<template>
  <div class="box_item message_input">
    <textarea v-model="text" placeholder="Please, enter message"></textarea>

    <MessageInputButton :disabled="disabled" :send-message="sendMessage" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import MessageInputButton from './MessageInputButton.vue';


export default {
  name: 'MessageInput',
  components: {
    MessageInputButton,
  },
  data() {
    return {
      text: '',
      currentUserId,
    };
  },
  computed: {
    disabled() {
      return this.text.trim() === '';
    },
    ...mapState({
      currentChatId: (state) => state.users.currentChatId,
    }),
  },
  methods: {
    sendMessage() {
      const data = {
        text: this.text.trim(),
        sent_at: (() => {
          const date = new Date();
          return date.toISOString();
        })(),
        chat_id: this.currentChatId,
        sender_id: this.currentUserId,
      };

      this.$store.dispatch('sendMessage', data);

      this.message = '';
    },
  }
};
</script>

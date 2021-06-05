<template>
  <div class="box_item message_input">
    <textarea v-model="message" placeholder="Please, enter message"></textarea>

    <MessageInputButton :disabled="disabled" :send-message="sendMessage" />
  </div>
</template>

<script>
import MessageInputButton from './MessageInputButton.vue';


export default {
  name: 'MessageInput',
  components: {
    MessageInputButton,
  },
  data() {
    return {
      message: '',
    };
  },
  computed: {
    disabled() {
      return this.message.trim() === '';
    },
  },
  methods: {
    sendMessage() {
      const data = {
        fromUser: this.$store.state.users.currentUserId,
        toUser: this.$store.state.users.currentInterlocutor.id,
        message: this.message.trim(),
        datetime: (() => {
          const date = new Date();
          return date.toISOString();
        })(),
      };

      this.$store.dispatch('addMessage', data);

      this.message = '';
    },
  }
};
</script>

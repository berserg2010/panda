<template>
  <perfect-scrollbar class="messages_list">
    <div>
      <MessagesListItem
        v-for="(message, key) in getMessages"
        :key="key"
        :class="[ userId === message.fromUser ? 'messages_list_item--right' : 'messages_list_item--left' ]"
        :message="message.message"
      />
    </div>
  </perfect-scrollbar>
</template>

<script>
import MessagesListItem from './MessagesListItem.vue';

export default {
  name: 'MessagesList',
  components: {
    MessagesListItem,
  },
  data() {
    return {
      userId: '1',
    }
  },
  computed: {
    getMessages() {
      return this.$store.getters.getMessages(this.$store.state.users.currentInterlocutor.id)
    },
  },
}
</script>

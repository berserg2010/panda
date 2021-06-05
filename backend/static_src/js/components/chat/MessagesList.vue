<template>
  <perfect-scrollbar class="messages_list" ref="scroll">
    <div> <!--Для отделеня списка от служебных элементов ps-->
      <MessagesListItem
        v-for="(message, key) in messages"
        :key="key"
        :class="[ currentUserId === message.fromUser ? 'messages_list_item--right' : 'messages_list_item--left' ]"
        :message="message.message"
      />
    </div>
  </perfect-scrollbar>
</template>

<script>
import { mapState } from 'vuex';

import MessagesListItem from './MessagesListItem.vue';


export default {
  name: 'MessagesList',
  components: {
    MessagesListItem,
  },
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState({
      currentUserId: (state) => state.users.currentUserId,
    }),
  },
  methods: {
    scrollToElement() {
      const el = this.$refs.scroll.$el;
      el.scrollBy(0, el.scrollHeight);
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.scrollToElement();
    });
  },
  updated() {
    this.scrollToElement();
  }
};
</script>

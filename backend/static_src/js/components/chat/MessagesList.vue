<template>
  <perfect-scrollbar class="messages_list" ref="scroll">
    <div> <!--Для отделеня списка от служебных элементов ps-->
      <MessagesListItem
        v-for="message in messages"
        :key="message.message_id"
        :class="[ currentUserId === message.sender_id ? 'messages_list_item--right' : 'messages_list_item--left' ]"
        :message="message.text"
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
  props: {
    messages: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentUserId
    }
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

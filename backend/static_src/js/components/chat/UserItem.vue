<template>
  <div class="box_item user-aria">
    <ArrowLeft v-if="forChat" />
    <div class="avatar">
      <img src="/static/img/user.jpg" alt="avatar">
    </div>
    <div class="content">
      <span>{{ user.full_name }}</span>
      <span v-if="!forChat && lastMessage">{{ lastMessage }}</span>
    </div>
  </div>
</template>

<script>
import ArrowLeft from './ArrowLeft.vue';


export default {
  name: 'UserListItem',
  components: {
    ArrowLeft,
  },
  props: {
    forChat: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    lastMessage() {
      const last_message = this.user.last_message
      return last_message?.text
    },
  },
};
</script>

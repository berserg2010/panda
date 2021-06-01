<template>
  <div class="box_item user-aria">
    <ArrowLeft v-if="forChat" />
    <div class="avatar">
      <img src="/static/img/user.jpg" alt="avatar">
    </div>
    <div class="content">
      <span>{{ user.username }}</span>
      <span v-if="!forChat">{{ lastMessage }}</span>
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
    }
  },
  data() {
    return {
      lastMessage: 'Hello! Hello! Hello! Hello! Hello!',
    }
  },
};
</script>

<template>
  <div
    class="user-aria"
    :class="{ 'user-aria__arrow_left': forChat, 'user-aria__arrow_left--active': forChat }"
  >
    <ArrowLeft v-if="forChat" />

    <div class="avatar">
      <img src="/static/img/user.jpg" alt="avatar">
    </div>
    <div class="content">
      <span>{{ fullName }}</span>
      <span v-if="!forChat">{{ message }}</span>
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
  },
  data() {
    return {
      fullName: 'Alina Ivanova',
      message: 'Hello! Hello! Hello! Hello! Hello!',
    }
  },
}
</script>

<template>
  <div class="user-aria">
    <ArrowLeft />

    <div class="avatar">
      <img src="/static/img/user.jpg" alt="avatar">
    </div>
    <div class="content">
      <span>{{ fullName }}</span>
<!--      <span>{{ message }}</span>-->
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
  data() {
    return {
      fullName: 'Alina Ivanova',
      message: 'Hello! Hello! Hello! Hello! Hello!',
    }
  },
}
</script>

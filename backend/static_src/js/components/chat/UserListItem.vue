<template>
  <li>
    <a href="#">
      <dev class="avatar">
        <img src="/static/img/user.jpg" alt="avatar">
      </dev>
      <div class="content">
        <span>{{ fullName }}</span>
        <span>{{ message }}</span>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: 'UserListItem',
  data() {
    return {
      fullName: 'Alina Ivanova',
      message: 'Hello! Hello! Hello! Hello! Hello!',
    }
  },
}
</script>

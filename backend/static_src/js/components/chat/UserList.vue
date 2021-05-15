<template>
  <ul class="chat-list">
    <UserListItem />
    <UserListItem />
    <UserListItem />
    <UserListItem />
    <UserListItem />
  </ul>
</template>

<script>
import UserListItem from './UserListItem.vue';

export default {
  name: 'UserList',
  components: {
    UserListItem,
  },
}
</script>

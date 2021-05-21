<template>
  <div class="chat-group">
    <ul class="chat-list">
      <UserListItem />
      <UserListItem />
      <UserListItem />
      <UserListItem />
      <UserListItem />
    </ul>
  </div>
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

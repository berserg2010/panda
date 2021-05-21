<template>
  <li>
    <a href="#">
      <UserItem />
    </a>
  </li>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  name: 'UserListItem',
  components: {
    UserItem,
  },
}
</script>

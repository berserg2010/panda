<template>
  <li>
    <a @click.prevent="checkUser">
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
  methods: {
    checkUser() {
      this.$store.dispatch('changePage', 'messages-page')
    }
  },
}
</script>

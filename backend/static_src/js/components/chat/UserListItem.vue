<template>
  <a @click.prevent="changePage">
    <UserItem :user="user" />
  </a>
</template>

<script>
import UserItem from './UserItem.vue';


export default {
  name: 'UserListItem',
  components: {
    UserItem,
  },
  props: {
    user: {
      type: Object,
      required: true,
    }
  },
  methods: {
    changePage() {
      this.$store.dispatch('changePage', 'messages-page');
      this.$store.dispatch('setCurrentInterlocutor', this.user);
    },
  },
};
</script>

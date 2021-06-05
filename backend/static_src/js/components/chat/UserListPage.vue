<template>
  <perfect-scrollbar class="chat-wrapper chat-group">
    <UserListItem
      v-for="interlocutor in interlocutors"
      :key="interlocutor.id"
      :user="interlocutor"
    />
  </perfect-scrollbar>
</template>

<script>
import UserListItem from './UserListItem.vue';


export default {
  name: 'UserList',
  components: {
    UserListItem,
  },
  props: {
    interlocutors: {
      type: Array,
      required: true,
    },
  },
};
</script>

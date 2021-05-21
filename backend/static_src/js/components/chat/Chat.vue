<template>
  <!--    <p>What chat room would you like to enter?</p>-->
  <!--    <label for="room-name-input">Room name</label>-->
  <!--    <input id="room-name-input" type="text">-->

  <!--    <input id="room-name-submit" type="button" value="Enter">-->
  <UserListPage />

  <MessagesPage />
</template>


<script>
import UserListPage from './UserListPage.vue';
import MessagesPage from './MessagesPage.vue';

export default {
  name: 'Chat',
  components: {
    UserListPage,
    MessagesPage,
  },
};
</script>

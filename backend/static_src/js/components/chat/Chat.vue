<template>
  <div class="chat-group">
<!--    <p>What chat room would you like to enter?</p>-->
<!--    <label for="room-name-input">Room name</label>-->
<!--    <input id="room-name-input" type="text">-->

<!--    <input id="room-name-submit" type="button" value="Enter">-->

    <UserList />
  </div>

  <div class="chat-message">
    <label for="chat-log">Чат-лог</label>
    <textarea id="chat-log" cols="100" rows="20"></textarea><br>
    <label for="chat-message-input">Сообщение</label>
    <input id="chat-message-input" type="text"><br>

    <input id="chat-message-submit" type="button" value="Send">
  </div>
</template>


<script>
import UserList from './UserList.vue';

export default {
  name: 'Chat',
  components: {
    UserList,
  },
};
</script>

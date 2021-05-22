<template>
  <div class="chat-message">
    <!--  <textarea id="chat-log" cols="100" rows="20"></textarea>-->
    <!--  <label for="chat-message-input">Сообщение</label>-->
    <!--  <input id="chat-message-input" type="text">-->

    <!--  <input id="chat-message-submit" disabled type="button" value="Send">-->

    <UserItem for-chat="true" />
  </div>
</template>

<script>
import UserItem from './UserItem.vue'

export default {
  name: 'MessagesPage',
  components: {
    UserItem,
  },
};
</script>

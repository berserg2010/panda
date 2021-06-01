<template>
  <div class="box_item message_input">
    <textarea placeholder="Please, enter message"></textarea>

    <MessageInputButton />
  </div>
</template>

<script>
import MessageInputButton from './MessageInputButton.vue';


export default {
  name: 'MessageInput',
  components: {
    MessageInputButton,
  }
}
</script>

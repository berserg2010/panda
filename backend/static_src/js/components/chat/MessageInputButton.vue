<template>
  <button type="button" class="message_input_button" @click.prevent="sendMessage">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path class="message_input_button__element" d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="#5F9F84"/>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'MessageInputButton',
  methods: {
    sendMessage() {
    }
  },
}
</script>

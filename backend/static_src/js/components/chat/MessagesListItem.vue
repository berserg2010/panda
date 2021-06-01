<template>
  <div class="box_item messages_list_item">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'MessagesListItem',
  props: {
    message: {
      type: String,
      required: true,
    }
  }
}
</script>

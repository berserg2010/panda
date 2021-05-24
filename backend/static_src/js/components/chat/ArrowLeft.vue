<template>
  <button type="button" class="arrow_left" @click.prevent="toListUsers"></button>
</template>

<script>
export default {
  name: 'ArrowLeft',
  methods: {
    toListUsers() {
      this.$store.dispatch('changePage', 'user-list-page')
    }
  },
}
</script>

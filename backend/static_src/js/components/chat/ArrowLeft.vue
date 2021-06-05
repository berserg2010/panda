<template>
  <button type="button" class="arrow_left" @click.prevent="toListUsers">
    <svg height="24px" viewBox="0 0 24 24" width="24px">
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path class="arrow_left__element" d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z"/>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'ArrowLeft',
  methods: {
    toListUsers() {
      this.$store.dispatch('changePage', 'user-list-page');
    }
  },
};
</script>

<template>
  <div class="alert alert--success">
    <p><slot></slot></p>
    <svg @click="closeAlert" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name:'alert-msg',

  methods: {
    ...mapActions('alert', ['closeAlert'])
  }
}
</script>

<style lang="scss">
.alert {
  margin: 10px 0 30px 0;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;

  p {
    width: 98%;
  }

  svg {
    width: 2%;
    cursor: pointer;

    &:hover {
      outline: none;
    }
  }

  &--success {
    background-color: aquamarine;
    color: green;
  }
}
</style>
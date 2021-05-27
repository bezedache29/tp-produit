<template>
  <div class="comment" v-if="comment.product_id === id">
    <h2>{{ comment.name }}</h2>
    <p>{{ comment.commentary }}</p>
  </div>
</template>

<script>
export default {
  name: 'product-comment',
  props: {
    comment: Object,
    id: String
  }
}
</script>

<style lang="scss">
.comment {
  margin: 1% 10%;
  border-radius: 10px;
  padding: 2%;
  background-color: #F2E63550;
}
</style>
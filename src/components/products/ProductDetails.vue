<template>
  <div class="details">
    <h1>Détails du produit : {{ product.title }}</h1>
    <div class="details__content">
      <div class="details__content__img">
      <img :src="product.img" alt="Image du produit">
    </div>
    <div class="details__content__description">
      <p>{{ product.details }}</p>
      <h3>Prix : {{ product.price }} €</h3>
    </div>
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    id: String
  },
  mounted() {
    this.getProduct(this.id)
  },
  computed: {
    ...mapState('product', ['product'])
  },
  methods: {
    ...mapActions('product', [
      'hideParent',
      'getProduct'
    ])
  },
  beforeRouteLeave (_, _2, next) {
    // Avant de changer de page, on ne cache plus la ProductList
    this.hideParent(false)
    next()
  }
}
</script>

<style lang="scss">
  .details {
    margin: 2% 10%;
    border-radius: 10px;
    padding: 2%;
    background-color: #ffd29450;

    h1 {
      text-align: center;
    }

    &__content {
      display: flex;
      margin-top: 2%;

      &__img {
        width: 30%;
      }

      &__description {
        width: 60%;
        margin-left: auto;
        margin-top: 2%;
        margin-right: 5%;
      }

      h3 {
        margin-top: 5%;
      }
    }
  }
</style>
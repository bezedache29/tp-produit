<template>
  <div class="products">

    <!-- Bouton d'ajout -->
    <div class="products__btn">
      <button>Ajouter un produit</button>
    </div>

    
    <div class="products__cards">
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
    </div>

  </div>
  <router-view></router-view>
</template>

<script>

import ProductCard from './ProductCard'

export default {
  components: {
    ProductCard
  }
}
</script>

<style lang="scss">
.products {

  margin: 0 10%;

  &__btn {
    display: flex;
    justify-content: center;
    margin: 40px 0;
  }

  &__cards {
    width: 100%;
    display: flex;
    align-items: center;
    flex-flow: row wrap;
  }

  &__card {
    
  }
}
</style>
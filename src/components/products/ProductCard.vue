<template>
  <!-- Start Card 1 produit -->
  <div class="product-card">
    <div class="product-card__header">
      <h2>Titre du produit</h2>
    </div>
    <div class="product-card__body">
      <div class="product-card__body__img">
        <img src="" alt="">
      </div>
      <p>Petite description du produit</p>
      <a href="">Voir détails</a>
      <details>
        <summary>Actions</summary>
        <div class="product-card__body__btns">
            <button>Supprimer</button>
          <button>Modifier</button>
        </div>
      </details>
    </div>
  </div>
  <!-- End Card 1 produit -->
</template>

<script>

export default {
  name: 'product-card',

}
</script>

<style lang="scss">
.product-card {
  width: 25%;
  padding: 10px;
  height: 200px;
}
</style>
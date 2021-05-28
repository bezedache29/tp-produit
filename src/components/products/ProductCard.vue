<template>
  <!-- Start Card produit -->
  <div class="product-card">
    <div class="product-card__container">
      <div class="product-card__header">
        <h3>{{ product.title }}</h3>
      </div>
      <div class="product-card__body">
        <div class="product-card__body__img">
          <img :src="product.img" alt="Image du produit">
        </div>
        <h3 class="text-center m-1 t-u">Description</h3>
        <p class="product-card__body__desc">{{ product.desc }}</p>
        <div class="product-card__body__bottom">
          <a @click="goToDetailsProduct(id)">Voir détails</a>
          <p>{{ product.price }} €</p>
        </div>
        
        <details>
          <summary>Actions</summary>
          <div class="product-card__body__btns">
            <button-primary color="danger" @click="showModalDeleteProduct(id)">Supprimer</button-primary>
            <button-primary color="warning" @click="showModalUpdateProduct(id)">Modifier</button-primary>
          </div>
        </details>
      </div>
    </div>
  </div>
  <!-- End Card produit -->
</template>

<script>
import { mapActions } from 'vuex'

import ButtonPrimary from '../UI/buttons/ButtonPrimary'

export default {
  name: 'product-card',
  props: {
    product: Object,
    id: String
  },
  components: {
    ButtonPrimary
  },
  methods: {
    ...mapActions('product', [
      'showModalUpdateProduct',
      'goToDetailsProduct',
      'showModalDeleteProduct'
    ])
  }
}
</script>

<style lang="scss">
.product-card {
  width: 25%;
  min-height: 550px;

  &__container {
    margin: 10px;
    padding: 10px;
    height: 95%;
    border-radius: 5px;
    background-color: #f2e53510;
    box-shadow: 0px 0px 5px #A68F1F;
  }

  &__header {
    text-align: center;
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__body {

    &__img {
      height: 100%;
      border-radius: 5px;
      overflow: hidden;
      margin-top: 20px;
      border: 1px solid #A68F1F;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &__desc {
      margin-bottom: 20px;
      font-size: 13px;
      height: 50px;
    }

    &__btns {
      display: flex;
      align-items: center;
      justify-content: space-around;

      &__btn {
        padding: 0 20px;
      }
    }

    &__bottom {
      display: flex;
      margin: 10px 0;

      a {
        cursor: pointer;
        color: #A68F1F;

        &:hover {
          text-decoration: underline;
        }
      }

      p {
        margin-left: auto;
        font-weight: bold;
      }
    }
  }

  details {
    cursor: pointer;
  }
  summary {
    font-weight: 600;
    color: #333;
    outline: none;
    border-radius: 0.25rem;
    text-align: left;
    cursor: pointer;
    position: relative;
    padding: 1em;
    text-align: center;
  }
  /* Animation */
  details[open] summary ~ * {
      animation: sweep 0.5s ease-in-out;
  }

  @keyframes sweep {
      0%    {
          opacity: 0; 
          margin-top: -10px;
      }
      100%  {
          opacity: 1; 
          margin-top: 0px;
      }
  }
}
</style>
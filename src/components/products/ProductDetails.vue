<template>
<div class="container">

  <!-- Alert Success -->
    <alert-msg v-if="isAlert">Ajout du commentaire avec succès</alert-msg>

  <!-- Start Details Produit -->
  <div class="details">
    <h1>Détails du produit : {{ product.title }}</h1>
    <div class="details__content">
      <div class="details__content__img">
        <img :src="product.img" alt="Image du produit">
      </div>
      <div class="details__content__description">
        <p>{{ product.details }}</p>
        <div class="details__content__description__bottom">
          <h3>Prix : {{ product.price }} €</h3>
          <button-primary class="details__content__description__bottom__btn" color="primary" @click="showModalAddComment">Ajouter un commentaire</button-primary>
        </div>
      </div>
    </div>
  </div>
  <!-- End Details produit -->

  <!-- Start Commentaires produit -->
  <div class="comments">
    
    <h2 class="text-center" @click="showComments(true)" v-if="!isShowComments">Voir les commentaires</h2>

    <div v-else>
      <h2 class="text-center" @click="showComments(false)">Cacher les commentaires</h2>
      <product-comment 
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
        :id="id"
      />
    </div>

  </div>
  <!-- End Commentaires produit -->

  <!-- Start Modal Add Comment -->
    <modal-app v-show="isShowModalComment">
      <template v-slot:header>
        Ajout d'un commentaire à {{ product.title }}
      </template>
      <template v-slot:default>
        <div class="form-group">
          <label for="name" class="form-group__label">Votre nom*</label>
          <input id="name" type="text" class="form-group__input" v-model.trim="name" @blur="checkName(name)" />
        </div>
        <p v-if="nameError" class="form-group__error">Votre nom doit être rempli</p>
        <div class="form-group">
          <label for="commentary" class="form-group__label">Votre commentaire*</label>
          <textarea id="commentary" class="form-group__textarea" cols="30" rows="10" v-model.trim="commentary" @blur="checkCommentary(commentary)"></textarea>
        </div>
        <p v-if="commentaryError" class="form-group__error">Votre commentaire doit être rempli</p>
      </template>
      <template v-slot:footer>
        <button-primary color="danger" class="mr-1" @click="closeModalAddComment">Annuler</button-primary>
        <button-primary color="primary" class="ml-1" @click="addComment(comment)">Ajouter</button-primary>
      </template>
    </modal-app>
  <!-- End Modal Add Comment -->
</div>
  
</template>

<script>
import { mapActions, mapState } from 'vuex'

import ButtonPrimary from '../UI/buttons/ButtonPrimary'
import ModalApp from '../UI/ModalApp'
import AlertMsg from '../UI/AlertMsg'
import ProductComment from './ProductComment'

export default {
  name: 'product-details',
  props: {
    id: String
  },
  data() {
    return {
      name: '',
      commentary: ''
    }
  },
  components: {
    ButtonPrimary,
    ModalApp,
    AlertMsg,
    ProductComment
  },
  mounted() {
    this.getProduct(this.id)
    this.searchAllComments()
    this.showComments(false)
    this.closeAlert()
  },
  watch: {
    isCommentAdded() {
      this.resetSubmit()
      this.searchAllComments()
      this.resetInputs()
      this.showAlert()
    },
  },
  computed: {
    hasError() {
      return this.name === '' || this.commentary === ''
    },
    comment() {
      return { name: this.name, commentary: this.commentary, product_id: this.id }
    },
    ...mapState('product', [
      'product'
    ]),
    ...mapState('comments', [
      'isShowModalComment',
      'nameError',
      'commentaryError',
      'comments',
      'isShowComments',
      'isCommentAdded'
    ]),
    ...mapState('alert', ['isAlert']),
  },
  methods: {
    resetInputs() {
      this.name = ''
      this.commentary = ''
    },
    ...mapActions('product', [
      'hideParent',
      'getProduct',
    ]),
    ...mapActions('comments', [
      'showModalAddComment',
      'closeModalAddComment',
      'checkName',
      'checkCommentary',
      'addComment',
      'searchAllComments',
      'showComments',
      'resetSubmit'
    ]),
    ...mapActions('alert', ['showAlert', 'closeAlert']),
  },
  beforeRouteLeave (_, from, next) {
    // Avant de changer de page, on ne cache plus la ProductList
    if (from === `products/${this.id}`) {
      next(false)
    } else {
      this.closeAlert()
      this.hideParent(false)
      next()
    }
    
  }
}
</script>

<style lang="scss" scoped>
  .details {
    margin: 2% 10%;
    border-radius: 5px;
    padding: 2%;
    background-color: #F2E63550;

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

        &__bottom {
          margin-top: 5%;
          width: 100%;
          display: flex;
          align-items: center;

          &__btn {
            margin-left: auto;
          }
        }
      }
    }
  }
  .comments {
    padding-bottom: 1%;

    h2 {
      cursor: pointer;

      &:hover {
        color: #A68F1F;
      }
    }
  }
</style>
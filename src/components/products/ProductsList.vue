<template>
  <div class="products">

    <!-- Bouton d'ajout -->
    <div class="products__btn">
      <button-primary color="primary" @click="showModalAddProduct(true)">Ajouter un produit</button-primary>
    </div>

    <!-- Alert Success -->
    <alert-msg v-if="isAlert">Un nouveau produit a été ajouté avec succès !</alert-msg>

    <!-- Start Modal Ajout Produit -->
    <modal-app v-if="getIsShowModalAddProduct">
      <template v-slot:header>
        Ajout d'un produit
      </template>
      <template v-slot:default>
        <div class="form-group">
          <label for="title" class="form-group__label">Titre du produit*</label>
          <input id="title" type="text" class="form-group__input" v-model="title" @blur="checkTitle(title)" />
        </div>
        <p v-if="titleError" class="form-group__error">Le titre doit être rempli</p>
        <div class="form-group">
          <label for="img" class="form-group__label">Url de l'image*</label>
          <input id="img" type="text" class="form-group__input" v-model="img" @blur="checkImg(img)" />
        </div>
        <p v-if="imgError" class="form-group__error">L'url est obligatoire et doit être un url valide</p>
        <div class="form-group">
          <label for="desc" class="form-group__label">Petite description*</label>
          <input id="desc" type="text" class="form-group__input" v-model="desc" @blur="checkDesc(desc)" />
        </div>
        <p v-if="descError" class="form-group__error">Une description est obligatoire</p>
        <div class="form-group">
          <label for="price" class="form-group__label">Prix en euros (ex: 12.34)*</label>
          <input id="price" type="number" class="form-group__input" v-model="price" @blur="checkPrice(price)" />
        </div>
        <p v-if="priceError" class="form-group__error">Le prix est obligatoire et ne contient que des chiffres</p>
        <div class="form-group">
          <label for="details" class="form-group__label">Description détaillée</label>
          <textarea id="details" class="form-group__textarea" cols="30" rows="10" v-model="details"></textarea>
        </div>
      </template>
      <template v-slot:footer>
        <button-primary color="danger" class="mr-1" @click="showModalAddProduct(false)">Annuler</button-primary>
        <button-primary color="primary" class="ml-1" @click="addProduct(product)">Ajouter</button-primary>
      </template>
    </modal-app>
    <!-- End Modal Ajout Produit -->

    <!-- Faire une recherche par titre de produit ?  -->
    
    <!-- Liste des Produits -->
    <div class="products__cards">
      <product-card 
        v-for="(product, id) in getProducts" :key="id" 
        :product="product"
        :id="id"
      />
    </div>

  </div>
  <router-view></router-view>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex'

import ProductCard from './ProductCard'
import ModalApp from '../UI/ModalApp'
import ButtonPrimary from '../UI/buttons/ButtonPrimary'
import AlertMsg from '../UI/AlertMsg'

export default {
  name: 'product-list',
  data() {
    return {
      title: '',
      img: '',
      desc: '',
      price: '',
      details: ''
    }
  },
  components: {
    ProductCard,
    ModalApp,
    ButtonPrimary,
    AlertMsg
  },

  mounted() {
    this.showModalAddProduct(false)
    this.searchAllProducts()
  },

  watch: {
    isProductAdded() {
      this.resetSubmit()
      this.searchAllProducts()
      this.resetInputs()
      this.showAlert()
    }
  },

  computed: {
    hasError() {
      return this.title === '' || this.img === '' || this.desc === '' || this.price === ''
    },
    product() {
      return { title: this.title, img: this.img, desc: this.desc, price: this.price, details: this.details }
    },
    ...mapGetters('products', [
      'getIsShowModalAddProduct',
      'getProducts'
    ]),
    ...mapState('products', [
      'titleError',
      'imgError',
      'descError',
      'priceError',
      'hasError',
      'isProductAdded'
    ]),
    ...mapState('alert', ['isAlert'])
  },

  methods: {
    resetInputs() {
      this.title = ''
      this.img = ''
      this.desc = ''
      this.price = ''
      this.details = ''
    },
    ...mapActions('products', [
      'showModalAddProduct',
      'checkTitle',
      'checkImg',
      'checkDesc',
      'checkPrice',
      'addProduct',
      'resetSubmit',
      'searchAllProducts'
    ]),
    ...mapActions('alert', ['showAlert'])
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
}
.form-group {
  width: 100%;
  display: flex;
  justify-content: center;

  &__label {
    width: 30%;
    text-align: end;
    margin: 10px 0;
    margin-right: 20px;
  }

  &__input {
    width: 60%;
    margin: 10px 0;
    border: none;
    border-bottom: 1px solid #F56A00;
    margin-right: 10%;

    &:focus {
      outline: none;
    }
  }

  &__textarea {
    width: 60%;
    margin: 10px 0;
    border-color: #F56A00;
    margin-right: 10%;

    &:focus {
      outline: none;
    }
  }

  &__error {
    width: 60%;
    margin-left: auto;
    margin-right: 10%;
    padding-left: 15px;
    font-size: 13px;
    color: #F73B1E;
  }
}
</style>
<template>
  <div class="products" v-if="!isParentHide">

    <!-- Bouton d'ajout -->
    <div class="products__btn">
      <button-primary color="primary" @click="showModalAddProduct(true)">Ajouter un produit</button-primary>
    </div>

    <!-- Alert Success -->
    <alert-msg v-if="isAlert">Mise à jour de la liste des produits</alert-msg>

    <!-- Start Modal Ajout Produit -->
    <transition name="scale-slide">
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
          <button-primary color="danger" class="mr-1" @click="closeModalAddProduct">Annuler</button-primary>
          <button-primary color="primary" class="ml-1" @click="addProduct(productAtAdd)">Ajouter</button-primary>
        </template>
      </modal-app>
    </transition>
    <!-- End Modal Ajout Produit -->

    <!-- Start Modal Update Produit -->
    <transition name="scale">
    <modal-app v-if="isModalUpdate">
      <template v-slot:header>
        Modification d'un produit
      </template>
      <template v-slot:default>
        <div class="form-group">
          <label for="title" class="form-group__label">Titre du produit*</label>
          <input id="title" type="text" class="form-group__input" v-model.trim="titleUpdate" @blur="checkTitle(titleUpdate)" />
        </div>
        <p v-if="titleError" class="form-group__error">Le titre doit être rempli</p>
        <div class="form-group">
          <label for="img" class="form-group__label">Url de l'image*</label>
          <input id="img" type="text" class="form-group__input" v-model.trim="imgUpdate" @blur="checkImg(imgUpdate)" />
        </div>
        <p v-if="imgError" class="form-group__error">L'url est obligatoire et doit être un url valide</p>
        <div class="form-group">
          <label for="desc" class="form-group__label">Petite description*</label>
          <input id="desc" type="text" class="form-group__input" v-model.trim="descUpdate" @blur="checkDesc(descUpdate)" />
        </div>
        <p v-if="descError" class="form-group__error">Une description est obligatoire</p>
        <div class="form-group">
          <label for="price" class="form-group__label">Prix en euros (ex: 12.34)*</label>
          <input id="price" type="number" class="form-group__input" v-model.trim="priceUpdate" @blur="checkPrice(priceUpdate)" />
        </div>
        <p v-if="priceError" class="form-group__error">Le prix est obligatoire et ne contient que des chiffres</p>
        <div class="form-group">
          <label for="details" class="form-group__label">Description détaillée</label>
          <textarea id="details" class="form-group__textarea" cols="30" rows="10" v-model.trim="detailsUpdate"></textarea>
        </div>
      </template>
      <template v-slot:footer>
        <button-primary color="danger" class="mr-1" @click="closeModalUpdateProduct">Annuler</button-primary>
        <button-primary color="primary" class="ml-1" @click="updateProduct(productUpdate)">Modifier</button-primary>
      </template>
    </modal-app>
    </transition>
    <!-- End Modal Update Produit -->

    <!-- Start Modal Delete Produit -->
    <transition name="bounce">
    <modal-app v-if="isModalDeleteProduct">
      <template v-slot:header>
        Supprimer le produit {{ product.title }} ?
      </template>
      <template v-slot:default>
        <div class="flex-x-y">
          <button-primary color="danger" class="mr-1" @click="closeModalDeleteProduct">Non</button-primary>
          <button-primary color="primary" class="ml-1" @click="deleteProduct(productId)">Oui</button-primary>
        </div>
      </template>
    </modal-app>
    </transition>
    <!-- End Modal Delete Produit -->

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
      details: '',
      titleUpdate: '',
      descUpdate: '',
      imgUpdate: '',
      priceUpdate: '',
      detailsUpdate: ''
    }
  },
  components: {
    ProductCard,
    ModalApp,
    ButtonPrimary,
    AlertMsg
  },

  mounted() {
    this.hideParent(false)
    this.closeModalAddProduct()
    this.searchAllProducts()
    this.closeAlert()
  },

  watch: {
    isProductAdded() {
      this.resetSubmit()
      this.searchAllProducts()
      this.resetInputs()
      this.showAlert()
    },
    product() {
      this.productNeedUpdate()
    },
    isProductUpdated() {
      this.resetUpdate()
      this.searchAllProducts()
      this.showAlert()
    },
    cleanErrors() {
      // console.log(this.cleanErrors)
      this.resetErrors()
    },
    productUpdated() {
      this.newProduct()
    },
    isParentHide() {
      if (this.isParentHide) {
        this.hideParent(true)
      }
    },
    isProductAndCommentsDeleted() {
      this.closeModalDeleteProduct()
      this.searchAllProducts()
      this.resetDeleteProductAndComments()
    }
  },

  computed: {
    hasError() {
      return this.title === '' || this.img === '' || this.desc === '' || this.price === ''
    },
    productAtAdd() {
      return { title: this.title, img: this.img, desc: this.desc, price: this.price, details: this.details }
    },
    productUpdate() {
      return { productId: this.productId, title: this.titleUpdate, img: this.imgUpdate, desc: this.descUpdate, price: this.priceUpdate, details: this.detailsUpdate }
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
      'isProductAdded',
      'productUpdated',
      'product'
    ]),
    ...mapState('alert', ['isAlert']),
    ...mapState('product', [
      'product',
      'productId',
      'isModalUpdate',
      'isProductUpdated',
      'cleanErrors',
      'isParentHide',
      'isModalDeleteProduct'
    ]),
    ...mapState('comments', ['isProductAndCommentsDeleted'])
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
      'searchAllProducts',
      'resetErrors',
      'updateProduct',
      'closeModalAddProduct'
    ]),
    ...mapActions('comments', [
      'deleteProduct'
    ]),
    ...mapActions('alert', ['showAlert', 'closeAlert']),
    productNeedUpdate() {
      this.titleUpdate = this.product.title
      this.imgUpdate = this.product.img
      this.descUpdate = this.product.desc
      this.priceUpdate = this.product.price
      this.detailsUpdate = this.product.details
    },
    ...mapActions('product', [
      'closeModalUpdateProduct',
      'resetUpdate',
      'newProduct',
      'hideParent',
      'closeModalDeleteProduct'
    ]),
    ...mapActions('comments', ['resetDeleteProductAndComments'])
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log(to)
  //   console.log(from)
  //   console.log(next)
  // },
}
</script>

<style lang="scss">
.products {

  margin: 0 10%;
  margin-top: 5%;

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
    border-bottom: 1px solid #A68F1F;
    margin-right: 10%;

    &:focus {
      outline: none;
    }
  }

  &__textarea {
    width: 60%;
    margin: 10px 0;
    border-color: #A68F1F;
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
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}


.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}


.scale-slide-enter-from {
  left: -100%;
}


.scale-slide-enter-to {
  left: 0%;
}


.scale-slide-leave-from {
  transform: scale(1);
}


.scale-slide-leave-to {
  transform: scale(0.8);
}
</style>
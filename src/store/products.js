import axios from 'axios'

const products = {
  namespaced: true,
  state() {
    return {
      products: {},
      isShowModalAddProduct: false,
      titleError: false,
      imgError: false,
      descError: false,
      priceError: false,
      hasError: false,
      url: 'https://tp-produit-ddb26-default-rtdb.europe-west1.firebasedatabase.app/',
      isProductAdded: false,
      productUpdated: false
    }
  },
  getters: {
    getIsShowModalAddProduct(state) {
      return state.isShowModalAddProduct
    },
    getProducts(state) {
      return state.products
    }
  },
  mutations: {
    SHOW_MODAL_ADD_PRODUCT(state, payload) {
      state.isShowModalAddProduct = payload
    },
    TITLE_ERROR(state, payload) {
      state.titleError = payload
    },
    IMAGE_ERROR(state, payload) {
      state.imgError = payload
    },
    DESC_ERROR(state, payload) {
      state.descError = payload
    },
    PRICE_ERROR(state, payload) {
      state.priceError = payload
    },
    HAS_ERROR(state, payload) {
      state.hasError = payload
    },
    IS_PRODUCT_ADDED(state, payload) {
      state.isProductAdded = payload
    },
    UPDATE_PRODUCTS(state, payload) {
      state.products = payload
    },
    IS_PRODUCT_UPDATED(state, payload) {
      state.productUpdated = payload
    }
  },
  actions: {
    showModalAddProduct(context, payload) {
      context.commit('SHOW_MODAL_ADD_PRODUCT', payload)
    },
    checkTitle(context, payload) {
      // Si c'est vide on indique qu'il y a une erreur
      // Sinon on pass la variable a false
      if (payload === '') {
        context.commit('TITLE_ERROR', true)
        context.commit('HAS_ERROR', true)
      } else {
        context.commit('TITLE_ERROR', false)
      }
    },
    checkImg(context, payload) {
      // On check que le lien commence par http:// ou https://
      const re = new RegExp("^(http|https)://", "i")
      const match = re.test(payload)

      // Si c'est vide ou que ca ne match pas, on indique qu'il y a une erreur
      // Sinon on pass la variable a false
      if (payload === '' || match === false) {
        context.commit('IMAGE_ERROR', true)
        context.commit('HAS_ERROR', true)
      } else {
        context.commit('IMAGE_ERROR', false)
      }
    },
    checkDesc(context, payload) {
      // Si c'est vide on indique qu'il y a une erreur
      // Sinon on pass la variable a false
      if (payload === '') {
        context.commit('DESC_ERROR', true)
        context.commit('HAS_ERROR', true)
      } else {
        context.commit('DESC_ERROR', false)
      }
    },
    // Permet de reset tous les champs du formulaire
    resetSubmit(context) {
      context.commit('IS_PRODUCT_ADDED', false)
    },
    checkPrice(context, payload) {
      // Si c'est vide ou que la valeur n'est pas un chiffre on indique qu'il y a une erreur
      // Sinon on pass la variable a false
      if (payload === '' || isNaN(payload)) {
        context.commit('PRICE_ERROR', true)
        context.commit('HAS_ERROR', true)
      } else {
        context.commit('PRICE_ERROR', false)
      }
    },
    async addProduct(context, payload) {

      // On informe qu'il n'y a pas d'erreurs
      context.commit('HAS_ERROR', false)

      // On check tous les inputs obligatoire avant submit
      context.dispatch('checkTitle', payload.title)
      context.dispatch('checkImg', payload.img)
      context.dispatch('checkDesc', payload.desc)
      context.dispatch('checkPrice', payload.price)

      // S'il n'y a pas d'erreurs on traite les informations
      if (!context.state.hasError) {

        const url = `${context.state.url}products.json`
        const item = { title: payload.title, img: payload.img, desc: payload.desc, price: payload.price, details: payload.details }

        try{
          const response = await axios.post(url, item)

          if(response.statusText === 'OK') {
            context.commit('SHOW_MODAL_ADD_PRODUCT', false)
            context.commit('IS_PRODUCT_ADDED', true)
          }

        } catch (e) {
          console.log(e);
        }
      }
    },
    async searchAllProducts(context) {

      const url = context.state.url + 'products.json'
      const firebaseResponse = await axios.get(url)

      context.commit('UPDATE_PRODUCTS', firebaseResponse.data)
    },
    resetErrors(context) {
      context.commit('TITLE_ERROR', false)
      context.commit('IMAGE_ERROR', false)
      context.commit('DESC_ERROR', false)
      context.commit('PRICE_ERROR', false)
    },
    async updateProduct(context, payload) {

      // On informe qu'il n'y a pas d'erreurs
      context.commit('HAS_ERROR', false)

      // On check tous les inputs obligatoire avant submit
      context.dispatch('checkTitle', payload.title)
      context.dispatch('checkImg', payload.img)
      context.dispatch('checkDesc', payload.desc)
      context.dispatch('checkPrice', payload.price)

      // S'il n'y a pas d'erreurs on traite les informations
      if (context.state.hasError === false) {

        const url = `${context.state.url}/products/${payload.productId}.json`

        const product = {
          title: payload.title, 
          img: payload.img,
          desc: payload.desc,
          price: payload.price,
          details: payload.details 
        }

        try{
          const response = await axios.put(url, product)
  
          if(response.statusText === 'OK') {
            context.commit('IS_PRODUCT_UPDATED', product)
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    closeModalAddProduct(context) {
      context.dispatch('resetErrors')
      context.commit('HAS_ERROR', false)
      context.commit('SHOW_MODAL_ADD_PRODUCT', false)
    }
  }
}

export default products
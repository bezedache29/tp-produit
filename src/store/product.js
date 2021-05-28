import axios from 'axios'
import router from '../router'

const product = {
  namespaced: true,
  state() {
    return {
      url: 'https://tp-produit-ddb26-default-rtdb.europe-west1.firebasedatabase.app/',
      product: {},
      productId: '',
      isModalUpdate: false,
      isProductUpdated: false,
      cleanErrors: false,
      isParentHide: false,
      isModalDeleteProduct: false
    }
  },
  getters: {
  },
  mutations: {
    PRODUCT_INFO(state, payload) {
      state.product = payload
    },
    SHOW_MODAL_UPDATE(state, payload) {
      state.isModalUpdate = payload
    },
    RESET_PRODUCT(state) {
      state.product = {}
    },
    PRODUCT_ID(state, payload) {
      state.productId = payload
    },
    IS_PRODUCT_UPDATED(state, payload) {
      state.isProductUpdated = payload
    },
    CLEAN_ERRORS(state, payload) {
      state.cleanErrors = payload
    },
    HIDE_PARENT(state, payload) {
      state.isParentHide = payload
    },
    SHOW_MODAL_DELETE_PRODUCT(state, payload) {
      state.isModalDeleteProduct = payload
    }
  },
  actions: {
    async showModalUpdateProduct(context, payload) {

      context.commit('PRODUCT_ID', payload)
      context.commit('CLEAN_ERRORS', false)

      const url = `${context.state.url}/products/${payload}.json`
      const firebaseResponse = await axios.get(url)

      context.commit('SHOW_MODAL_UPDATE', true)
      context.commit('PRODUCT_INFO', firebaseResponse.data)
    },
    showModalDeleteProduct(context, payload) {
      context.dispatch('getProduct', payload)
      context.commit('PRODUCT_ID', payload)
      context.commit('SHOW_MODAL_DELETE_PRODUCT', true)
    },
    closeModalDeleteProduct(context) {
      context.commit('RESET_PRODUCT')
      context.commit('PRODUCT_ID', '')
      context.commit('SHOW_MODAL_DELETE_PRODUCT', false)
    },
    closeModalUpdateProduct(context) {
      context.commit('CLEAN_ERRORS', true)
      context.commit('RESET_PRODUCT')
      context.commit('SHOW_MODAL_UPDATE', false)
    },
    resetUpdate(context) {
      context.commit('IS_PRODUCT_UPDATED', false)
    },
    newProduct(context) {
      context.commit('SHOW_MODAL_UPDATE', false)
      context.commit('IS_PRODUCT_UPDATED', true)
      context.commit('CLEAN_ERRORS', true)
    },
    goToDetailsProduct(context, payload) {
      context.commit('RESET_PRODUCT')
      context.commit('HIDE_PARENT', true)
      const id = payload
      router.push({ name: 'product-details', params: { id } })
    },
    // Permet de cacher la page parent lorsque d'un details de produit est demandé
    hideParent(context, payload) {
      context.commit('HIDE_PARENT', payload)
    },
    async getProduct(context, payload) {
      const url = `${context.state.url}/products/${payload}.json`
      const firebaseResponse = await axios.get(url)
      context.commit('PRODUCT_INFO', firebaseResponse.data)
    }
  }
}

export default product
import axios from 'axios'

const product = {
  namespaced: true,
  state() {
    return {
      url: 'https://tp-produit-ddb26-default-rtdb.europe-west1.firebasedatabase.app/',
      product: {},
      // productId: '',
      isModalUpdate: false,
      isProductUpdated: false,
      cleanErrors: false
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
    }
  },
  actions: {
    async showModalUpdateProduct(context, payload) {

      context.commit('CLEAN_ERRORS', false)

      const url = `${context.state.url}/products/${payload}.json`
      const firebaseResponse = await axios.get(url);

      context.commit('SHOW_MODAL_UPDATE', true)
      // context.commit('PRODUCT_ID', payload)
      context.commit('PRODUCT_INFO', firebaseResponse.data)
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
    }
  }
}

export default product
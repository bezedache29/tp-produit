const products = {
  namespaced: true,
  state() {
    return {
      isShowModalAddProduct: false,
      titleError: false,
      imgError: false,
      descError: false,
      priceError: false,
      hasError: false
    }
  },
  getters: {
    getIsShowModalAddProduct(state) {
      return state.isShowModalAddProduct
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
    addProduct(context, payload) {

      console.log(context)
      
      if (payload.title === '') {
        context.commit('TITLE_ERROR', true)
        context.commit('HAS_ERROR', true)
      } else {
        context.commit('TITLE_ERROR', false)
        context.commit('HAS_ERROR', false)
      }
      if (payload.img === '') {
        context.commit('IMAGE_ERROR', true)
        context.commit('HAS_ERROR', true)
      } else {
        context.commit('IMAGE_ERROR', false)
        context.commit('HAS_ERROR', false)
      }
      if (payload.desc === '') {
        context.commit('DESC_ERROR', true)
        context.commit('HAS_ERROR', true)
      } else {
        context.commit('DESC_ERROR', false)
        context.commit('HAS_ERROR', false)
      }
      if (payload.price === '') {
        context.commit('PRICE_ERROR', true)
        context.commit('HAS_ERROR', true)
      } else {
        context.commit('PRICE_ERROR', false)
        context.commit('HAS_ERROR', false)
      }

      if (context.state.hasError === false) {
        console.log("On envoie les données en BDD")
        // On reset les champs
        // On ferme la modal
        // On recharge tous les produits
        // On ouvre une modal informant le success ??
      }
    }
  }
}

export default products
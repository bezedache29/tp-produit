import axios from 'axios'

const users = {
  namespaced: true,
  state() {
    return {
      showModalCo: false,
      url: 'https://tp-produit-ddb26-default-rtdb.europe-west1.firebasedatabase.app/',
      user: {},
      hasError: false,
      isCo: false,
      resetInputs: false
    }
  },
  mutations: {
    SHOW_MODAL_CO(state, payload) {
      state.showModalCo = payload
    },
    UPDATE_USER(state, payload) {
      state.user = payload
    },
    HAS_ERROR(state, payload) {
      state.hasError = payload
    },
    IS_CO(state, payload) {
      state.isCo = payload
    },
    RESET_INPUTS(state, payload) {
      state.resetInputs = payload
    }
  },
  actions: {
    showModalConnexion(context, payload) {
      context.commit('SHOW_MODAL_CO', payload)
    },
    async connect(context, payload) {
      context.commit('HAS_ERROR', false)
      const url = `${context.state.url}users.json`

      if (!context.state.hasError) {
        const response = await axios.get(url)

        const userDB = response.data['-MamDCEls1bzsKhz32B-']

        if ((payload.pseudo === userDB.username) && (payload.pwd === userDB.pwd)) {
          context.commit('UPDATE_USER', userDB)
          context.commit('SHOW_MODAL_CO', false),
          context.commit('IS_CO', true)
          context.commit('RESET_INPUTS', true)
        } else {
          context.commit('HAS_ERROR', true)
        }
      }
    },
    deconnexion(context) {
      context.commit('HAS_ERROR', false)
      context.commit('UPDATE_USER', '')
      context.commit('IS_CO', false)
      context.commit('RESET_INPUTS', true)
    },
    noConnect(context) {
      context.commit('SHOW_MODAL_CO', false)
      context.commit('HAS_ERROR', false)
      context.commit('RESET_INPUTS', true)
    },
    changeResetInputs(context, payload) {
      context.commit('RESET_INPUTS', payload)
    }
  }
}

export default users
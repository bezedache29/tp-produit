const alert = {
  namespaced: true,
  state() {
    return {
      isAlert: false
    }
  },
  getters: {
  },
  mutations: {
    SHOW_ALERT(state, payload) {
      state.isAlert = payload
    }
  },
  actions: {
    closeAlert(context) {
      context.commit('SHOW_ALERT', false)
    },
    showAlert(context) {
      context.commit('SHOW_ALERT', true)
    }
  }
}

export default alert
import axios from 'axios'

const comments = {
  namespaced: true,
  state() {
    return {
      isShowModalComment: false,
      nameError: false,
      commentaryError: false,
      hasError: false,
      url: 'https://tp-produit-ddb26-default-rtdb.europe-west1.firebasedatabase.app/',
      isCommentAdded: false,
      comments: {},
      isShowComments: false,
      isProductAndCommentsDeleted: false
    }
  },
  getters: {
  },
  mutations: {
    SHOW_MODAL_COMMENT(state, payload) {
      state.isShowModalComment = payload
    },
    NAME_ERROR(state, payload) {
      state.nameError = payload
    },
    COMMENTARY_ERROR(state, payload) {
      state.commentaryError = payload
    },
    HAS_ERROR(state, payload) {
      state.hasError = payload
    },
    IS_COMMENT_ADDED(state, payload) {
      state.isCommentAdded = payload
    },
    UPDATE_COMMENTS(state, payload) {
      state.comments = payload
    },
    SHOW_COMMENTS(state, payload) {
      state.isShowComments = payload
    },
    PRODUCT_AND_COMMENTS_DELETED(state, payload) {
      state.isProductAndCommentsDeleted = payload
    }
  },
  actions: {
    showModalAddComment(context) {
      context.commit('SHOW_MODAL_COMMENT', true)
      context.commit('COMMENTARY_ERROR', false)
      context.commit('NAME_ERROR', false)
    },
    closeModalAddComment(context) {
      context.commit('SHOW_MODAL_COMMENT', false)
    },
    checkName(context, payload) {
      if (payload === '') {
        context.commit('NAME_ERROR', true)
        context.commit('HAS_ERROR', true)
      } else {
        context.commit('NAME_ERROR', false)
      }
    },
    checkCommentary(context, payload) {
      if (payload === '') {
        context.commit('COMMENTARY_ERROR', true)
        context.commit('HAS_ERROR', true)
      } else {
        context.commit('COMMENTARY_ERROR', false)
      }
    },
    async addComment(context, payload) {

      context.commit('HAS_ERROR', false)

      context.dispatch('checkName', payload.name)
      context.dispatch('checkCommentary', payload.commentary)

      if (context.state.hasError === false) {
        const url = context.state.url + '/commentaries.json'
        const item = { name: payload.name, commentary: payload.commentary, product_id: payload.product_id }

        try{
          const response = await axios.post(url, item)
          if(response.statusText === 'OK') {
            context.commit('SHOW_MODAL_COMMENT', false)
            context.commit('IS_COMMENT_ADDED', true)
            context.commit('SHOW_COMMENTS', true)
          }
        } catch (e) {
          console.log(e);
        }
      }

      console.log(context)
      console.log(payload)
    },
    resetSubmit(context) {
      context.commit('IS_COMMENT_ADDED', false)
    },
    async searchAllComments(context) {
      const url = context.state.url + '/commentaries.json'
      const firebaseResponse = await axios.get(url)

      context.commit('UPDATE_COMMENTS', firebaseResponse.data)
    },
    showComments(context, payload) {
      context.commit('SHOW_COMMENTS', payload)
    },
    async deleteProduct(context, payload) {
      await context.dispatch('searchAllComments')
      
      const urlComments = context.state.url + 'commentaries'
      const urlProducts = context.state.url + 'products'

      for (const [key, value] of Object.entries(context.state.comments)) {
        if (value.product_id === payload) {
          
          try {
            const response = await axios.delete(`${urlComments}/${key}.json`)
    
            if(response.statusText !== 'OK') {
              throw new Error("Une erreur est survenue !")
            }
            
          } catch(error) {
            alert(error.message)
          }
        }
      }

      try {
        const reponse = await axios.delete(`${urlProducts}/${payload}.json`)

        if(reponse.statusText !== 'OK') {
          throw new Error("Une erreur est survenue !")
        }

        context.commit('PRODUCT_AND_COMMENTS_DELETED', true)

      } catch(error) {
        alert(error.message)
      }
    },
    resetDeleteProductAndComments(context) {
      context.commit('PRODUCT_AND_COMMENTS_DELETED', false)
    }
  }
}

export default comments
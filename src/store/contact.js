import axios from 'axios'
import router from '../router'

const contact = {
  namespaced: true,
  state() {
    return {
      hasError: false,
      nameError: false,
      emailError: false,
      objectError: false,
      contentError: false,
      url: 'https://tp-produit-ddb26-default-rtdb.europe-west1.firebasedatabase.app/',
      isModalForm: false,
      resetInputs: false,
      mails: {},
      isSeen: false,
    }
  },
  getters: {
  },
  mutations: {
    HAS_ERROR(state, payload){
      state.hasError = payload;
    },
    NAME_ERROR(state, payload){
      state.nameError = payload;
    },
    EMAIL_ERROR(state, payload){
      state.emailError = payload;
    },
    OBJECT_ERROR(state, payload){
      state.objectError = payload;
    },
    CONTENT_ERROR(state, payload){
      state.contentError = payload;
    },
    SHOW_MODAL_ADD_FORM(state, payload) {
      state.isModalForm = payload;
    },
    RESET_INPUTS(state, payload) {
      state.resetInputs = payload;
    },
    UPDATE_MAILS(state, payload) {
      state.mails = payload;
    },
    IS_SEEN(state, payload) {
      state.isSeen = payload;
    }
  },
  actions: {
    async sendContact(context, payload) {
      context.commit('HAS_ERROR', false);
      context.dispatch('checkName', payload.name);
      context.dispatch('checkEmail', payload.email);
      context.dispatch('checkObject', payload.object);
      context.dispatch('checkContent', payload.content);

      if(!context.state.hasError) {
        const item = {name: payload.name, email: payload.email, object: payload.object, content: payload.content, status: 0}
        
        try{
          const response = await axios.post(`${context.state.url}/form.json`, item);
          if(response.statusText === 'OK') {
            context.commit('SHOW_MODAL_ADD_FORM', true)
          }
        } catch (e) {
          console.log(e);
        }

      }
      
    },
    checkName(context, payload) {
  
      if(payload != '') {
        context.commit('NAME_ERROR', false);
      } else {
        context.commit('NAME_ERROR', true);
        context.commit('HAS_ERROR', true);
      }
    },
    checkEmail(context, payload) {
      
      if(payload != '') {
        context.commit('EMAIL_ERROR', false);
      } else {
        context.commit('EMAIL_ERROR', true);
        context.commit('HAS_ERROR', true);
      }
    },
    checkObject(context, payload) {
      
      if(payload != '') {
        context.commit('OBJECT_ERROR', false);
      } else {
        context.commit('OBJECT_ERROR', true);
        context.commit('HAS_ERROR', true);
      }
    },
    checkContent(context, payload) {
      
      if(payload != '') {
        context.commit('CONTENT_ERROR', false);
      } else {
        context.commit('CONTENT_ERROR', true);
        context.commit('HAS_ERROR', true);
      }
    },
    closeModal(context) {
      context.commit('RESET_INPUTS', true);
      context.commit('SHOW_MODAL_ADD_FORM', false);
      router.push({name: 'mail-box'});
    },
    async getMails(context) {
      const response = await axios.get(`${context.state.url}/form.json`);
      context.commit('UPDATE_MAILS', response.data);
    },
    async changeStatus(context, payload) {
      if(payload.mail.status == 0){
        const item = {name: payload.mail.name, email: payload.mail.email, object: payload.mail.object, content: payload.mail.content, status: 1}
        try {
          const response = await axios.put(`${context.state.url}/form/${payload.id}.json`, item);
          if(response.statusText === 'OK') {
            context.dispatch('getMails');
          }
        } catch(e) {
          console.log(e);
        }
      }
    },
    async del(context, payload) {
      try {
        const response = await axios.delete(`${context.state.url}/form/${payload}.json`);
        if(response.statusText === 'OK') {
          context.dispatch('getMails');
        }
      } catch(e) {
        console.log(e);
      }
    },
  }
}

export default contact
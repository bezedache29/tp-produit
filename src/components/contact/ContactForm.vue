<template>
  <div class="form-placement">
    <h1>Formulaire de contact</h1>
    <form class="form">
      <input type="text" placeholder="Nom" v-model.trim="name" @blur="checkName(name)">
      <p class="danger" v-if="nameError">Il y a une erreur sur ce champs</p>
      <input type="text" placeholder="Email" v-model.trim="email" @blur="checkEmail(email)">
      <p class="danger" v-if="emailError">Il y a une erreur sur ce champs</p>
      <input type="text" placeholder="Objet" v-model.trim="object" @blur="checkObject(object)">
      <p class="danger" v-if="objectError">Il y a une erreur sur ce champs}</p>
      <textarea placeholder="Contenu" v-model.trim="content" rows="3" @blur="checkContent(content)"></textarea>
      <p class="danger" v-if="contentError">Il y a une erreur sur ce champs</p>
      <button-primary color="primary" @click.prevent="sendContact(form)">Valider</button-primary>
    </form>
    
    <modal-app v-if="isModalForm">
      <template v-slot:header>Confirmation</template>
      <template v-slot:default>Le formulaire à bien été envoyer.</template>
      <template v-slot:footer>
        <button-primary color="primary" @click.prevent="closeModal">Valider</button-primary>
      </template>
    </modal-app>
  </div>

  <router-view></router-view>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ButtonPrimary from '../UI/buttons/ButtonPrimary'
import ModalApp from '../UI/ModalApp.vue'
export default {
  data() {
    return {
      name: '',
      email: '',
      object: '',
      content: '',
    }
  },
  components: {
    ButtonPrimary,
    ModalApp,
  },
  methods: {
    ...mapActions('contact', ['sendContact', 'checkName', 'checkEmail', 'checkObject', 'checkContent', 'closeModal', 'resetErrors'])
  },
  computed: {
    form() {
      return {
        name: this.name,
        email: this.email,
        object: this.object,
        content: this.content,
      }
    },
    ...mapState('contact', ['hasError', 'nameError', 'emailError', 'objectError', 'contentError', 'isModalForm', 'resetInputs']),
  },
  watch: {
    resetInputs() {
      if(this.resetInputs) {
        this.name = '';
        this.email = '';
        this.object = '';
        this.content = '';
      }
    }
  },
  beforeRouteLeave(to, from, next) {
      this.resetErrors();
      next()
  },
}
</script>

<style scoped lang="scss">

  .form-placement {
    margin-top: 40px;
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-top: 5%;
  }

  h1 {
    text-align: center;
    margin: 20px;
  }
  .form {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 60%;
    padding: 40px 0;
    border-radius: 5px;

    input,
    textarea {
      min-height: 30px;
      padding: 5px;
      width: 80%;
      margin: 10px 0;
      border: none;
      border-bottom: 1px solid #A68F1F;
      font-family: sans-serif;
      font-size: 18px;
      color: black;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: black;
      }
    }

    .danger {
      color: red;
      align-self: flex-start;
      margin-left: 10%;
    }
  }
</style>
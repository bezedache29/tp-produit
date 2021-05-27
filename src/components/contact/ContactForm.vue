<template>
  <h1>Formulaire de contact</h1>
  <form class="form">
    <input type="text" placeholder="Nom" v-model="name" @blur="checkName(name)">
    <p class="danger" v-if="nameError">Il y a une erreur sur ce champs</p>
    <input type="text" placeholder="Email" v-model="email" @blur="checkEmail(email)">
    <p class="danger" v-if="emailError">Il y a une erreur sur ce champs</p>
    <input type="text" placeholder="Objet" v-model="object" @blur="checkObject(object)">
    <p class="danger" v-if="objectError">Il y a une erreur sur ce champs}</p>
    <textarea placeholder="Contenu" v-model="content" rows="3" @blur="checkContent(content)"></textarea>
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
    ...mapActions('contact', ['sendContact', 'checkName', 'checkEmail', 'checkObject', 'checkContent', 'closeModal'])
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
  }
}
</script>

<style scoped lang="scss">
  h1 {
    text-align: center;
  }
  .form {
    display: flex;
    flex-flow: column;
    align-items: center;

    input,
    textarea {
      margin: 10px;
      width: 40%;
      min-height: 30px;
      padding: 5px;
    }

    .danger {
      color: red;
    }
  }
</style>
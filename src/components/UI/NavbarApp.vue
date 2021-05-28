<template>
  <div class="navbar">
    <div class="navbar__logo">
      <p>Tp-Produit</p>
    </div>
    <nav>
      <ul class="navbar__nav">
        
        <li class="navbar__nav__li">
          <router-link class="navbar__nav__link" :to="home">
            Accueil
          </router-link>
        </li>
        <li class="navbar__nav__li">
          <router-link class="navbar__nav__link" :to="productsList">
            Liste des produits
          </router-link>
        </li>
        <li class="navbar__nav__dropdown navbar__nav__li">
          <span :class="isActive">Contact</span>
          <ul class="navbar__nav__dropdown__content">
            <li>
              <router-link class="navbar__nav__link" :to="contactForm">
                Formulaire
              </router-link>
            </li>
            <li>
              <router-link class="navbar__nav__link" :to="mailBox">
                Boite de réception
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <span class="navbar__nav__link" @click="deconnexion" v-if="isCo">
            Deconnexion
          </span>
          <span class="navbar__nav__link" @click="showModalConnexion(true)" v-else>
            Connexion
          </span>
        </li>
      </ul>
    </nav>
  </div>

  <modal-app v-show="showModalCo">
    <template v-slot:header>
      Connexion
    </template>
    <template v-slot:default class="modalContent">
      <input type="text" v-model.trim="pseudo" placeholder="Identifiant">
      <input type="password" v-model.trim="pwd" placeholder="Mot de passe">
    </template>
    <template v-slot:footer>
      <button-primary color="danger" @click="noConnect">Annuler</button-primary>
      <button-primary color="primary" @click="connect({pseudo, pwd})">Connexion</button-primary>
      <p v-if="hasError" class="danger">Identifiant ou Mot incorrect</p>
    </template>
  </modal-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import ModalApp from '../UI/ModalApp'
import ButtonPrimary from '../UI/buttons/ButtonPrimary'

export default {
  name: 'navbar-app',
  data() {
    return {
      pseudo: '',
      pwd: ''
    }
  },
  components: {
    ModalApp,
    ButtonPrimary
  },
  computed: {
    home() {
      return { name: 'home-app' }
    },
    productsList() {
      return { name: 'products-list' }
    },
    contactForm() {
      return { name: 'contact-form' }
    },
    mailBox() {
      return { name: 'mail-box' }
    },
    isActive() {
      return this.$route.fullPath == '/form' || this.$route.fullPath == '/form/mailbox' ? 'active' : '';
    },
    ...mapState('users', [
      'isCo',
      'user',
      'hasError',
      'showModalCo',
      'resetInputs'
    ])
  },
  watch: {
    resetInputs() {
      if (this.resetInputs) {
        this.pseudo = '',
        this.pwd = ''

        this.changeResetInputs(false)
      }
    }
  },
  methods: {
    ...mapActions('users', [
      'showModalConnexion',
      'connect',
      'deconnexion',
      'noConnect',
      'changeResetInputs'
    ])
  }
}
</script>

<style lang="scss">
.navbar {
  display: flex;
  box-shadow: 0px 2px 4px 0px #000000;
  background-color: white;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1;

  &__logo {
    margin: 20px;
  }

  &__nav {
    display: flex;
    align-items: center;
    margin: 10px 0;

    &__li {
      margin: 10px 20px;

      span {
        cursor: pointer;
        padding: 10px;
        margin-left: -10px;
        &:hover {
          color: #F2E635;
        }
      }
    }

    &__link {
      color: black;
      cursor: pointer;

      &:hover {
        color: #F2E635;
      }
    }

    &__dropdown {
      position: relative;
      display: inline-block;

      &__content {
        display: none;
        position: absolute;
        min-width: 160px;
        padding: 12px 0;
        z-index: 1;
        background-color: white;
        padding: 10px;
        margin-left: -10px;
        box-shadow: 0px 10px 10px -4px #000000;

        li {
          margin: 10px 0;
          color: yellow;
          padding: 5px 0;

          &:hover {
            color: black;
          }
        }
      }

      &:hover &__content {
        display: block;
      }
    }
  }
}
.active {
    color: #A68F1F;
}

.modal__content {
  display: flex;
  flex-flow: column;
  align-items: center;
  input {
    width: 80%;
    margin: 10px 0;
    border: none;
    border-bottom: 1px solid #A68F1F;
    padding: 10px;
    font-size: 18px;
    color: black;

    &:focus {
      outline: none;
    }

    &::placeholder {
    color: black;
    }
  }
}

  .danger {
    font-size: 14px;
    color: red;
  }
.modal__footer {
  display: flex;
  flex-flow: column;
  align-items: center;
  align-self: center;
  margin: 0;
  width: 100%;
  button {
    width: 80%;
    margin: 10px 0;
  }

}
</style>
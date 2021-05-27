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
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navbar-app',
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
    }
  }
}
</script>

<style lang="scss">
.navbar {
  display: flex;
  box-shadow: 0px 4px 10px 4px #000000;

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
</style>
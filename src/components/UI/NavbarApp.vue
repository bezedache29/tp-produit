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
          <span>Contact</span>
          <ul class="navbar__nav__dropdown__content">
            <li>
              <router-link class="navbar__nav__link" :to="contactForm">
                Formulaire
              </router-link>
            </li>
            <li>
              <router-link class="navbar__nav__link" :to="responsesForm">
                Liste des réponses
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
    responsesForm() {
      return { name: 'responses-form' }
    },
  }
}
</script>

<style lang="scss">
.navbar {
  display: flex;

  &__logo {
    margin: 20px;
  }

  &__nav {
    display: flex;
    align-items: center;
    margin: 10px 0;

    &__li {
      margin: 10px;
    }

    &__link {
      color: black;

      &:hover {
        color: #FFD294;
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

        li {
          margin: 5px 0;
          color: yellow;

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
    color: #F56A00;
}
</style>
import { createWebHistory, createRouter } from "vue-router"

import HomeApp from '../components/HomeApp.vue'
import ProductsList from '../components/products/ProductsList.vue'
import ProductDetails from '../components/products/ProductDetails.vue'
import ContactForm from '../components/contact/ContactForm.vue'
import MailBox from '../components/contact/MailBox.vue'

const router = createRouter({
  routes: [
    { name: 'home-app', path: '/', component: HomeApp },
    { name: 'products-list', path: '/products', component: ProductsList, children: 
      [
        { name: 'product-details', path: ':id', component: ProductDetails, props: true },
      ] 
    },
    { name: 'contact-form', path: '/form', component: ContactForm },
    { name: 'mail-box', path: '/form/mailbox', component: MailBox }
  ],
  history: createWebHistory(),
  linkActiveClass: 'active'
})


export default router
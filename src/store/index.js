import { createStore } from 'vuex'
import products from './products'
import alert from './alert'
import product from './product'
import comments from './comments'
import contact from './contact'

const store = createStore({
  modules: {
    products,
    alert,
    product,
    comments,
    contact
  }
})

export default store
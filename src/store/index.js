import { createStore } from 'vuex'
import products from './products'
import alert from './alert'
import product from './product'

const store = createStore({
  modules: {
    products,
    alert,
    product
  }
})

export default store
import { createStore } from 'vuex'
import products from './products'
import alert from './alert'

const store = createStore({
  modules: {
    products,
    alert
  }
})

export default store
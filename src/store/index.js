import { createStore } from 'vuex'
import usuario from './usuario'
import feed from './feed'

const store = createStore({
  modules: {
      usuario,
      feed
  }
})


export default store;
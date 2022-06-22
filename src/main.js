import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import { library } from "@fortawesome/fontawesome-svg-core"
import { faUser, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faUser, faEnvelope, faKey)

const app = createApp(App)
app.component('fa', FontAwesomeIcon)
app.use(store)
app.use(router)
app.mount('#app')



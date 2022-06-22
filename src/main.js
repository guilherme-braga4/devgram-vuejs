import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core"
import { faUser, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faUser, faEnvelope, faKey)

const app = createApp(App)
app.component('fa', FontAwesomeIcon)
app.mount('#app')

app.use(router)

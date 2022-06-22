import { createRouter, createWebHistory } from 'vue-router'
import TelaCadastro from '../views/Cadastro/TelaCadastro.vue'
import Login from '../components/login/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/cadastro',
      name: 'TelaCadastro',
      component: TelaCadastro
    },
  ]
})

export default router

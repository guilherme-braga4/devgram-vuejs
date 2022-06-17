import { createRouter, createWebHistory } from 'vue-router'
import TelaCadastro from '../views/Cadastro/TelaCadastro.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/cadastro',
      name: 'cadastro',
      component: TelaCadastro
    }
  ]
})

export default router

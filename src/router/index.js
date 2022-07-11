import { createRouter, createWebHistory } from 'vue-router'
import TelaCadastro from '../views/Cadastro/TelaCadastro.vue'
import TelaPerfil from '../views/Perfil/TelaPerfil.vue'
import TelaEditarPerfil from '../views/Perfil/TelaEditarPerfil.vue'
import TelaPublicacao from '../views/Publicacao/TelaPublicacao.vue'
import Home from '../components/home/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/cadastro',
      name: 'TelaCadastro',
      component: TelaCadastro
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/publicacao',
      name: 'TelaPublicacao',
      component: TelaPublicacao
    },
    {
      path: '/perfil/:id',
      name: 'TelaPerfil',
      component: TelaPerfil
    },
    {
      path: '/perfil/editar',
      name: 'TelaEditarPerfil',
      component: TelaEditarPerfil
    },
    // {
    //   path: '/cadastro',
    //   name: 'TelaCadastro',
    //   component: TelaCadastro
    // },
  ]
})

export default router

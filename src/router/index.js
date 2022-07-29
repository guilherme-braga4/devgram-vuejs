import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/login/Login.vue'
import TelaCadastro from '../views/Cadastro/TelaCadastro.vue'
import TelaPerfil from '../views/Perfil/TelaPerfil.vue'
import TelaEditarPerfil from '../views/Perfil/TelaEditarPerfil.vue'
import TelaPublicacao from '../views/Publicacao/TelaPublicacao.vue'
import Home from '../components/home/Home.vue'
import UsuarioService from '../services/UsuarioService'

const usuarioService = new UsuarioService()

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
      component: Home,
      meta: { estaAutenticado: true }
    },
    {
      path: '/publicacao',
      name: 'TelaPublicacao',
      component: TelaPublicacao,
      meta: { estaAutenticado: true }
    },
    {
      path: '/perfil/:id',
      name: 'TelaPerfil',
      component: TelaPerfil,
      meta: { estaAutenticado: true }
    },
    {
      path: '/perfil/editar',
      name: 'TelaEditarPerfil',
      component: TelaEditarPerfil,
      meta: { estaAutenticado: true }
    }
  ]
})

router.beforeEach((to, from) => {
  //se a rota necessita de autenticação, e o usuário não está logado, irá redirecionar para o /login
  if (to.meta.estaAutenticado && !usuarioService.estaAutenticado()) {
    return {
      path: '*',
      component: Login
    }
  }
})

export default router

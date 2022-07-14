<template>
  <header className="container-root">
    <Cabecalho v-if="token" @token="setToken"/>
      <RouterView></RouterView>
    <Rodape v-if="token"/>
    <Login v-else="token" @token="setToken"/>
  </header>
</template>


<script>
import Login from './components/login/Login.vue'
import Home from './components/home/Home.vue'
import Cabecalho from './components/layout/Cabecalho.vue'
import Rodape from './components/layout/Rodape.vue'
import router from './router/index'
import UsuarioService from './services/UsuarioService'
import { provide } from 'vue'

export default {
  components: {
    Login,
    Home,
    Cabecalho,
    Rodape
  },
  setup () {
    const usuarioService = new UsuarioService();

    if (typeof window !== 'undefined') {
            if (!usuarioService.estaAutenticado()) {
                router.replace('/');
                return null;
            }

    const usuarioLogado = usuarioService.obterInformacoesDoUsuarioLogado();
    provide('usuarioLogado', usuarioLogado)

    const token = localStorage.getItem('token')
    const setToken = (e) => {token = e}

    return {
      token,
      usuarioLogado
    }
  }
}
}
</script>


<style src="@/styles/global.scss" lang="sass"/>


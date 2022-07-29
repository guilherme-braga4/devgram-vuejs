<script>
import Login from './components/login/Login.vue'
import Home from './components/home/Home.vue'
import Cabecalho from './components/layout/Cabecalho.vue'
import Rodape from './components/layout/Rodape.vue'
import UsuarioService from './services/UsuarioService'
import {
  provide,
  ref,
  watch,
  watchEffect,
  onMounted,
  onUpdated,
  onUnmounted
} from 'vue'

console.log('App.....')

const usuarioService = new UsuarioService()

export default {
  name: 'App',
  components: {
    Login,
    Home,
    Cabecalho,
    Rodape
  },
  setup() {
    const token = ref()
    const usuarioLogado = ref()

    console.log('App...........')
    // onUnmounted(() => console.log('onUnmounted.....'))

    // watchEffect(() => console.log('watchEffect.....'))

    // onMounted(() => console.log('OnMounted.....'))

    // onUpdated(() => console.log('onUpdated.....'))

    //Essa função recebe o Token via Props, e causa uma atualização no DOM via reatividade
    const setToken = props => {
      token.value = props
    }
    //Essa função recebe as Informações do Usuário via Props, e causa uma atualização no DOM via reatividade
    const setUser = props => {
      usuarioLogado.value = props
    }

    //Transferindo (Provide) as Informações do Usuário após atualizar(Update) o Ciclo de Vida
    onUpdated(() => provide('usuarioLogado', usuarioLogado.value))

    //Essa função garante que o "Token && Informações Do Usuário" sejam mantidos após re-montar o Componente
    onMounted(() => {
      const obterToken = usuarioService.obterToken()
      token.value = obterToken
      usuarioLogado.value = usuarioService.obterInformacoesDoUsuarioLogado()
      provide('usuarioLogado', usuarioLogado.value)
    })

    return {
      token,
      setToken,
      setUser
    }
  }
}
</script>

<template>
  <header className="container-root">
    <Cabecalho v-if="token" />
    <RouterView></RouterView>
    <Rodape v-if="token" />
    <Login v-else="token" :setToken="setToken" :setUser="setUser" />
  </header>
</template>

<style src="@/styles/global.scss" lang="sass" />

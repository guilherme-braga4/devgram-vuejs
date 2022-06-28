<template>
  <header className="container-root">
    <RouterView></RouterView>
    <home v-if="token" @token="setToken"/>
    <login v-else="token" @token="setToken"/>
  </header>
</template>


<script>
import Login from './components/login/Login.vue'
import Home from './components/home/Home.vue'
import Cadastro from './views/Cadastro/TelaCadastro.vue'
import comAutorizacao from './hoc/comAutorizacao.js'

export default {
  data(){
    return {
      token: localStorage.getItem('token')
    }
  },
  components: {
    login : Login,
    cadastro : Cadastro,
    home: comAutorizacao(Home)
  },
  methods: {
    setToken(e){
      this.token = e;
      console.log("this.token APP", this.token)
    }
  }
}

</script>


<style src="@/styles/global.scss" lang="sass"/>


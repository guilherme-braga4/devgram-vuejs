<template>
  <header className="container-root">
    <RouterView></RouterView>
    <home v-if="token" @token="setToken"/>
    <login v-else="token" @token="setToken"/>
  </header>
</template>


<script>
import Login from './components/login/Login.vue'
import Cadastro from './views/Cadastro/TelaCadastro.vue'

export default {
  data(){
    return {
      token: localStorage.getItem('accessToken')
    }
  },
  components: {
    login : Login,
    cadastro : Cadastro
  },
  methods: {
    setToken(e){
      this.token = e;
    }
  }
}

</script>


<style src="@/styles/global.scss" lang="sass"/>


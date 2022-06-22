<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Cadastro from './views/Cadastro/TelaCadastro.vue'
import Login from './components/login/Login.vue'

</script>

<template>
  <header className="container-root">
    <RouterView></RouterView>
  </header>
</template>


<style src="@/styles/global.scss" lang="sass"/>


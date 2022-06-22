<script>
  export default {
    props: {
       type: {
        default: 'button',
        type: String
        },
      texto: {
        default: '',
        type: String
        },
      cor: {
        default: 'primaria',
        type: String
      },
      desabilitado: {
        default: false,
        type: Boolean
      },
      manipularClique: {

      },

    }
  }
</script>

<template>
  <button 
  className="btn primaria"
  :v-on:click="manipularClique"
  :disabled="desabilitado"
  :type="type">
     {{texto}}
  </button>
</template>

<style src="./botao.scss" lang="sass"/>
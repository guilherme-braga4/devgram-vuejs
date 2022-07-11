<script>
import {computed} from 'vue'

  export default {
    props: {
       type: {
        default: 'button',
        },
      texto: '',
      cor: {
        default: 'primaria',
      },
      desabilitado: {
        default: false,
      },
      manipularClique: '',
      },
      setup (props) {
        console.log("props button", props)
        const classButton = computed(() => `btn ${props.cor}`)
          return {
            classButton
          }
      }
  }
</script>

<template>
  <button 
  :class="classButton"
  v-on:click="manipularClique"
  :disabled="desabilitado"
  :type="type">
     {{texto}}
  </button>
</template>

<style src="./botao.scss" lang="sass"/>
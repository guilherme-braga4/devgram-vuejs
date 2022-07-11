<script>
import {computed} from 'vue'

export default {
    name: 'CabecalhoComAcoes',
    props: {
        class: '',
        iconeEquerda: '',
        textoEsquerda: null,
        aoClicarAcaoEsquerda: '',
        titulo: '',
        elementoDireita: '',
        aoClicarElementoDireita: '',
        elementoDireitaPerfil: '',
        imgLogout: '',
        logout: '',
    },
    setup (props) {
     console.log("props CabecalhoComAcoes", props)
     const classCabecalho = computed(() => `cabecalhoComAcoes ${props.class}`)

        return {
            classCabecalho
        }
    }
} 
</script>

<template>
    <div :class="classCabecalho">
                <img
                    v-if="iconeEquerda"
                    :src="iconeEquerda"
                    alt='icone esquerda cabeçalho com ações'
                    v-on:click="aoClicarAcaoEsquerda"
                    :width="25"
                    :height="50"
                />
                 <span 
                    v-else
                    v-if="textoEsquerda !== null"
                    className="cabecalhoComAcoesTextoEsquerda" 
                    v-on:click="aoClicarAcaoEsquerda"
                >
                        {{textoEsquerda}}
                 </span>

                <h3>{{titulo}}</h3>

                <button
                    v-if="elementoDireita"
                    type='button'
                    className='btnAcaoDireita'
                    v-on:click="aoClicarElementoDireita"
                >
                    {{elementoDireita}}
                </button>
                <img
                    v-if="elementoDireitaPerfil"
                     :src="imgLogout"
                     alt='icone logout'
                     v-on:click="logout"
                     :width="25"
                     :height="50"
                 />
        </div>
</template>


<style src="./cabecalhoComAcoes.scss" lang="scss"/>
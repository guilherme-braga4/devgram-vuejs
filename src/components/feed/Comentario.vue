<script>
  import Avatar from '../avatar/Avatar.vue'
  import { useStore } from 'vuex';
  import { reactive, onMounted, ref, watchEffect } from 'vue'


  import FeedService from "../../services/FeedService";

  const feedService = new FeedService();

  export default {
    name: 'Comentario',
    props: {
      modelValue: '',
      comentar: ''
    },  
    components: {
      Avatar
    },
    setup(props, context) {
      const comentario = ref("")
      const linhas = ref(1)

      const aoDigitarComentario = (event) => {
            comentario.value = event.target.value
            context.emit('update:modelValue', comentario.value);
            linhas.value = comentario.value > 0 ? 2 : 1
      }

      const aoPressionarQualquerTecla = (event) => {
        if (event.key === 'Enter') {
            return fazerComentario()
        }
      }

      const fazerComentario = () => {
        if (comentario.value.trim().length === 0 || !comentario.value) {
            return console.log("Algo deu errado com seu comentário");
        }
        props.comentar(comentario.value);
    }


      return {
        comentario,
        linhas,
        aoDigitarComentario,
        aoPressionarQualquerTecla,
        fazerComentario
      }
    },
  }
</script>

<template>
    <div className="containerFazerComentario">
            <Avatar alt="perfil image"/>
            <textarea
                placeholder="Adicione um comentario..."
                @input="aoDigitarComentario"
                @keyup.enter="aoPressionarQualquerTecla"
                :value="modelValue"
                :rows="linhas"
                >
            </textarea>
            <button
                type="button"
                className="btnPublicacao desktop"
                v-on:click="fazerComentario()"
            >
                Publicar
            </button>
        </div>
</template>

<style src="./feed.scss" lang="sass"/>

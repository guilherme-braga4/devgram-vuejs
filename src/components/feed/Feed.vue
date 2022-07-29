<script>
import Postagem from './Postagem.vue'
import {
  ref,
  inject,
  watchEffect,
  watch,
  onUnmounted,
  onMounted,
  onUpdated,
  onBeforeMount,
  onBeforeUpdate
} from 'vue'
import FeedService from '../../services/FeedService'

const feedService = new FeedService()

export default {
  name: 'Feed',
  components: {
    Postagem
  },
  props: {
    usuarioPerfilAtual: ''
  },
  setup(props) {
    const listaDePostagens = ref([])
    const usuarioLogado = inject('usuarioLogado')

    watchEffect(async () => {
      const { data } = await feedService.carregarPostagens(
        props.usuarioPerfilAtual?._id
      )
      const postagensFormatadas = data.map(postagem => ({
        id: postagem._id,
        usuario: {
          id: postagem.idUsuario || props.usuarioPerfilAtual?._id,
          nome: postagem?.usuario?.nome || props.usuarioPerfilAtual?.nome,
          avatar: postagem?.usuario?.avatar || props.usuarioPerfilAtual?.avatar
        },
        fotoDoPost: postagem.foto,
        descricao: postagem.descricao,
        curtidas: postagem.likes,
        comentarios: postagem.comentarios.map(c => ({
          nome: c.nome,
          mensagem: c.comentario
        }))
      }))
      listaDePostagens.value = postagensFormatadas
    })

    // console.log('listaDePostagens', listaDePostagens.value);

    return {
      listaDePostagens
    }
  }
}
</script>

<template>
  <div
    className="feedContainer largura30pctDesktop"
    v-for="item in listaDePostagens"
  >
    <Postagem :postagens="item" />
  </div>
</template>

<style src="./feed.scss" lang="sass" />

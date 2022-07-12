<script>
  import Postagem from './Postagem.vue'
  import { ref, inject, watchEffect } from 'vue'
  import FeedService from "../../services/FeedService";

  const feedService = new FeedService();

  export default {
    name: 'Feed',
    components: {
      Postagem,
    },
    props: {
      usuarioPerfilAtual: ''
    },
    setup (props) {
    // console.log("props", props)

    const listaDePostagens = ref([])

    const usuarioLogado = inject('usuarioLogado')
    // console.log("usuarioLogado", usuarioLogado)

    watchEffect(async () => {
      const { data } = await feedService.carregarPostagens(props.usuarioPerfilAtual?._id);
      const postagensFormatadas = data.map((postagem) => (
            console.log("postagem", postagem),
            {
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
            }
        ));
        listaDePostagens.value = postagensFormatadas
        // console.log("listaDePostagens.value", listaDePostagens.value)
    }, [usuarioLogado, props.usuarioPerfilAtual]) 
      return {
        listaDePostagens
      }
    },
  }
</script>

<template>
  <div className="feedContainer largura30pctDesktop" v-for="item in listaDePostagens">
      <Postagem 
        :postagens="item"
      />
  </div>
</template>

<style src="./feed.scss" lang="sass"/>


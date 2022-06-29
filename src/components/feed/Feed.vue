<script>
  console.log("Feed")
  import Postagem from './Postagem.vue'
  import { useStore } from 'vuex';
  import { watchEffect } from 'vue'

  import FeedService from "../../services/FeedService";

  const feedService = new FeedService();

  export default {
    name: 'Feed',
    components: {
      Postagem,
    },
    data() {
      return {
        usuarioId: []
      }
    },
    setup () {
      const store = useStore();
      watchEffect(async () => {
        console.log("dentro do watchEffect do Feed")
        const { data } = await feedService.carregarPostagens(store.state.usuario.usuarioLogado.id);
        const postagensFormatadas = data.map((postagem) => (
            {
                id: postagem._id,
                usuario: {
                    id: postagem.userId,
                    nome: postagem?.usuario?.nome,
                    avatar: postagem?.usuario?.avatar
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
        store.state.feed.listaDePostagens = postagensFormatadas
      }, [])
    }, 
  }
</script>

<template>
  <div className="feedContainer largura30pctDesktop"  >
    <h1>Feed</h1>
      <Postagem/>
  </div>
</template>

<style src="./feed.scss" lang="sass"/>


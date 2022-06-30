<script>
  import Postagem from './Postagem.vue'
  import { useStore } from 'vuex';
  import { reactive, onMounted, ref } from 'vue'

  import FeedService from "../../services/FeedService";

  const feedService = new FeedService();

  export default {
    name: 'Feed',
    components: {
      Postagem,
    },
     setup () {
      const store = useStore();
      const state = reactive({
        listaDePostagens: [],
      });

    onMounted(async () => {
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
        state.listaDePostagens = postagensFormatadas
    }) 
      return {state}
    },
  }
</script>

<template>
  <div className="feedContainer largura30pctDesktop" v-for="item in state">
      <Postagem :postagens="state"/>
  </div>
</template>

<style src="./feed.scss" lang="sass"/>


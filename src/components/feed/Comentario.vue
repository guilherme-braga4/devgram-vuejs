<script>
  console.log("Comentario")
  // import Avatar from '../avatar/Avatar.vue'
  import { useStore } from 'vuex';

  import FeedService from "../../services/FeedService";

  const feedService = new FeedService();

  export default {
    name: 'Comentario',
    // components: {
    //   Avatar
    // },
    // setup () {
    //   const store = useStore();
    //   const listaDePostagens = store.state.usuario.listaDePostagens
    //   console.log(listaDePostagens)
    //   return {listaDePostagens}
    // }, 
  }
</script>

<template>
  <div>
    <h1>Comentario</h1>
  </div>
    <div className="containerFazerComentario">
            <!-- <Avatar src={usuarioLogado.avatar} /> -->
            <textarea
                rows={linhas}
                onChange={aoDigitarComentario}
                onKeyDown={aoPressionarQualquerTecla}
                autoFocus={true}
                value={comentario}
                placeholder="Adicione um comentario...">
            </textarea>
            <button
                type="button"
                className="btnPublicacao desktop"
                onClick={fazerComentario}
            >
                Publicar
            </button>
        </div>
</template>

<style src="./feed.scss" lang="sass"/>

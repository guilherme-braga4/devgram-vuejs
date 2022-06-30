<script>
  import Avatar from '../avatar/Avatar.vue'
  import { useStore } from 'vuex';

  import FeedService from "../../services/FeedService";

  const feedService = new FeedService();

  export default {
    name: 'Comentario',
    props: {
      avatarUsuario: ''
    },  
    components: {
      Avatar
    },
  }
</script>

<template>
    <div className="containerFazerComentario">
            <Avatar :v-model="avatarUsuario" alt="perfil image"/>
            <textarea
                value=''
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

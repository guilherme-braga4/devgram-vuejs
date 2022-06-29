<script>
  console.log("Postagem")
  import Comentario from './Comentario.vue'
  import Avatar from '../avatar/Avatar.vue'
  import { useStore } from 'vuex';
  import { watchEffect } from 'vue'

  import FeedService from "../../services/FeedService";

  const feedService = new FeedService();
  // const store = useStore();

  export default {
    name: 'Postagem',
    // props: {
    //   dadosPostagem: {
    //     type: String,
    //     default: []
    //   }
    // },  
    components: {
        Comentario, 
        Avatar,
    },
     data(){
        return {
           valoresListaFeed: [],
           comentarios: [],
           usuarioLogado: []
        }
    },
    mounted(){
      const store = useStore();
      watchEffect(() => {
        this.usuarioLogado = store.state.usuario.usuarioLogado
        this.valoresListaFeed = store.state.feed.listaDePostagens
        this.comentarios = this.valoresListaFeed.map((i) => i.comentarios)
        console.log("this.valoresListaFeed", this.valoresListaFeed)
        console.log("this.comentarios", this.comentarios[0])
        console.log("Feed UsuarioLogado State", this.usuarioLogado)
      })
    },
    setup () {

    }, 
  }
</script>

<template>
<div className="postagem" v-for="item in valoresListaFeed">
            <!-- <Link href={`/perfil/${usuarioLogado.id}`}> -->
                <!-- <router-link path=""> -->
                <section className="cabecalhoPostagem">
                    <Avatar :imageProps="usuarioLogado.avatar" alt="perfil image"/>
                    <strong>{{usuarioLogado.nome}}</strong>
                </section>
                <!-- </router-link> -->
            <!-- </Link> -->

            <div className="fotoDaPostagem" > 
                <img :src="item.fotoDoPost" alt='foto da postagem' />
            </div>

            <div className="rodapeDaPostagem">
                <div className="acoesDaPostagem">
                    <Image
                        src={obterImagemCurtida()}
                        alt='icone curtir'
                        width={20}
                        height={20}
                        onClick={alterarCurtida}
                    />

                    <Image
                        src={obterImagemComentario()}
                        alt='icone comentar'
                        width={20}
                        height={20}
                    />

                    <span className="quantidadeCurtidas">
                        Curtido por <strong> 333 pessoas</strong>
                    </span>
                </div>

                <div className="descricaoDaPostagem">
                    <strong className="nomeUsuario">{{usuarioLogado.nome}}</strong>
                    <p className="descricao">


                            <span
                                onClick={exibirDescricaoCompleta}
                                className="exibirDescricaoCompleta">
                                mais
                            </span>
 
                    </p>
                </div>

                <div className="comentariosDaPublicacao">
                        <div className="comentario" v-for="comentario in comentarios">
                            <strong className="nomeUsuario">{{comentario.nome}}</strong>
                            <p className="descricao">{{comentario.mensagem}}</p>
                        </div>

                </div>
            </div>

                <Comentario comentar={comentar} usuarioLogado={usuarioLogado} />
        </div>
</template>

<style src="./feed.scss" lang="sass"/>

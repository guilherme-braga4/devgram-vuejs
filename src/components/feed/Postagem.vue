<script>
  console.log("Postagem")
  import Comentario from './Comentario.vue'
  import Avatar from '../avatar/Avatar.vue'
  import { useStore } from 'vuex';
  import { watchEffect } from 'vue'

  import imgCurtir from '../../public/imagens/curtir.svg';
  import imgCurtido from '../../public/imagens/curtido.svg';
  import imgComentarioAtivo from '../../public/imagens/comentarioAtivo.svg';
  import imgComentarioCinza from '../../public/imagens/comentarioCinza.svg';

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
           imagens: {
            imagemCurtir: imgCurtir,
            imagemCurtido: imgCurtido,
            imagemComentarioAtivo: imgComentarioAtivo,
            imagemComentarioCinza: imgComentarioCinza
           },
           valoresListaFeed: [],
           comentarios: [],
           idPostagem: '',
           usuarioLogado: [],
           curtidasPostagem: {
                default: "10",
                type: String
           },
           comentariosPostagem: {
                default: this.comentarios,
                type: String
           },
           deveExibirSecaoParaComentar: {
                default: false,
                type: Boolean
           },
           tamanhoAtualDaDescricao: {
                default: 90,
                type: Number
           }
        }
    },
    mounted(){
      const store = useStore();
      watchEffect(() => {
        this.usuarioLogado = store.state.usuario.usuarioLogado
        this.valoresListaFeed = store.state.feed.listaDePostagens
        this.idPostagem = this.valoresListaFeed.map((i) => i.id)
        this.curtidasPostagem = this.valoresListaFeed.map((i) => i.curtidas)
        this.comentarios = this.valoresListaFeed.map((i) => i.comentarios)
        console.log("valoresListaFeed", this.valoresListaFeed)
        console.log("comentarios", this.comentarios)
        console.log("curtidasPostagem", this.curtidasPostagem)
        console.log("Feed UsuarioLogado State", this.usuarioLogado)
      })
    },
    computed: {
        exibirDescricaoCompleta () {
            this.tamanhoAtualDaDescricao(Number.MAX_SAFE_INTEGER)
        },
        descricaoMaiorQueLimite () {
            return this.valoresListaFeed.descricao.length > this.tamanhoAtualDaDescricao;
        },
        obterDescricao () {
            let mensagem = this.valoresListaFeed.descricao.substring(0, this.tamanhoAtualDaDescricao);
            if (this.descricaoMaiorQueLimite()) {
                mensagem += '...';
            }
            return mensagem;
        },
    },
    methods: {
        // async comentar (comentario) {
        //     try {
        //     await feedService.adicionarComentario(this.usuarioLogado.id, this.comentarios);
        //     setDeveExibirSecaoParaComentar(false);
        //     setComentariosPostagem([
        //         ...comentariosPostagem,
        //         {
        //             nome: this.usuarioLogado.nome,
        //             mensagem: comentario
        //         }
        //     ]);
        // } catch (e) {
        //     alert(`Erro ao fazer comentario! ` + (e?.response?.data?.erro || ''));
        // }
        // },
        async alterarCurtida () {
            try {
            await feedService.alterarCurtida(this.idPostagem);
            console.log(this.usuarioLogadoCurtiuPostagem())
            if (this.usuarioLogadoCurtiuPostagem()) {
                console.log("if do alterarCurtida")
                // tiro o usuario logado da lista de curtidas
                this.curtidasPostagem = this.curtidasPostagem.filter(idUsuarioQueCurtiu => idUsuarioQueCurtiu !== this.usuarioLogado.id)
            }
            else { 
                console.log("else do alterarCurtida")
                this.curtidasPostagem = [...this.curtidasPostagem, this.usuarioLogado.id]
                console.log("curtidasPostagem do alterarCurtida", this.curtidasPostagem)
            }
        } catch (e) {
            alert(`Erro ao alterar a curtida! ` + (e?.response?.data?.erro || ''));
        }
        },
        usuarioLogadoCurtiuPostagem () {
            return this.curtidasPostagem.includes(this.usuarioLogado.id)
        },
         obterImagemCurtida () {
             return this.usuarioLogadoCurtiuPostagem()
            ? this.imagens.imagemCurtido
            : this.imagens.imagemCurtir;
        },
        obterImagemComentario () {
            return this.deveExibirSecaoParaComentar
            ? this.imagens.imagemComentarioAtivo
            : this.imagens.imagemComentarioCinza;
        },
        exibirSecaoParaComentar() {
            return this.deveExibirSecaoParaComentar = !this.deveExibirSecaoParaComentar
        }
    }
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
                        <img
                            :src="obterImagemCurtida()"
                            alt='icone curtir'
                            className="feedIcone"
                            v-on:click="alterarCurtida()"
                        />
                        <img
                            :src="obterImagemComentario()"
                            alt='icone comentar'
                            className="feedIcone"
                            v-on:click="exibirSecaoParaComentar()"
                        />
                    <span className="quantidadeCurtidas">
                        Curtido por <strong> {{curtidasPostagem.length}} pessoas</strong>
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

                <Comentario 
                    v-if="deveExibirSecaoParaComentar == true"
                    :avatarUsuario="usuarioLogado.avatar" />
        </div>
</template>

<style src="./feed.scss" lang="sass"/>

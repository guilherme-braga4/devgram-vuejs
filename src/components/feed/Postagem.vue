<script>
  import Comentario from './Comentario.vue'
  import Avatar from '../avatar/Avatar.vue'
  import { useStore } from 'vuex';
  import { reactive, onMounted, ref, watchEffect } from 'vue'


  import imgCurtir from '../../public/imagens/curtir.svg';
  import imgCurtido from '../../public/imagens/curtido.svg';
  import imgComentarioAtivo from '../../public/imagens/comentarioAtivo.svg';
  import imgComentarioCinza from '../../public/imagens/comentarioCinza.svg';

  import FeedService from "../../services/FeedService";

  const feedService = new FeedService();

  export default {
    name: 'Postagem',
    props: {
      postagens: []
    },  
    components: {
        Comentario, 
        Avatar,
    },
    setup (props) {
    //carrega a Lista de Postagens
    let listaDePostagens = ref([])
    let idPostagem = ref('')
    let listaDeCurtidasPostagem = ref([''])
    let listaDeComentariosDasPostagens = ref([])
    let deveExibirSecaoParaComentar = ref(false)
    let tamanhoAtualDaDescricao = ref(90)
    let receberComentario = ref('')

    console.log("receberComentario", receberComentario)

    let imagens = {
        imagemCurtir: imgCurtir,
        imagemCurtido: imgCurtido,
        imagemComentarioAtivo: imgComentarioAtivo,
        imagemComentarioCinza: imgComentarioCinza
    }
        
    //precisamos esperar a API fazer o fetch (no Componente Pai), para então receber as props corretamente
     watchEffect(() => {{
        listaDePostagens.value = props.postagens.listaDePostagens
        listaDeCurtidasPostagem.value = props.postagens.listaDePostagens.map((i) => i.curtidas)
        listaDeComentariosDasPostagens.value = props.postagens.listaDePostagens.map((i) => i.comentarios)
        idPostagem.value = listaDePostagens.value.map((i) => i.id)
        return (
            console.log("listaDePostagens", listaDePostagens.value),
            console.log("listaDeCurtidasPostagem", listaDeCurtidasPostagem.value),
            console.log("listaDeComentariosDasPostagens", listaDeComentariosDasPostagens.value),
            console.log("idPostagem", idPostagem.value)
        )
     }}, [listaDePostagens.value])

     const comentar = async (comentario) => {
            try {
            await feedService.adicionarComentario(idPostagem.value, comentario);
            deveExibirSecaoParaComentar.value = false;
        } catch (e) {
            alert(`Erro ao fazer comentario! ` + (e?.response?.data?.erro || ''));
        }
    }

        return {
            listaDePostagens, 
            listaDeComentariosDasPostagens,
            idPostagem,
            listaDeCurtidasPostagem,
            imagens,
            deveExibirSecaoParaComentar,
            tamanhoAtualDaDescricao,
            receberComentario,
            comentar
        }
    },
    
    //---> temporario
     data(){
        return {
           usuarioLogado: [],
        }
    },
    mounted(){
      const store = useStore();
        this.usuarioLogado = store.state.usuario.usuarioLogado
        console.log("Feed UsuarioLogado State", this.usuarioLogado)
    },
    //---> temporario

    computed: {
        exibirDescricaoCompleta () {
            tamanhoAtualDaDescricao(Number.MAX_SAFE_INTEGER)
        },
        descricaoMaiorQueLimite () {
            return listaDePostagens.descricao.length > tamanhoAtualDaDescricao;
        },
        obterDescricao () {
            let mensagem = listaDePostagens.descricao.substring(0, tamanhoAtualDaDescricao);
            if (this.descricaoMaiorQueLimite()) {
                mensagem += '...';
            }
            return mensagem;
        },
    },
    methods: {
        async alterarCurtida () {
            try {
            await feedService.alterarCurtida(this.idPostagem);
            if (this.usuarioLogadoCurtiuPostagem()) {
                // tiro o usuario logado da lista de curtidas
                this.listaDeCurtidasPostagem = this.listaDeCurtidasPostagem.filter(idUsuarioQueCurtiu => idUsuarioQueCurtiu !== this.usuarioLogado.id)
            }
            else { 
                this.listaDeCurtidasPostagem = [...this.listaDeCurtidasPostagem, this.usuarioLogado.id]
            }
        } catch (e) {
            alert(`Erro ao alterar a curtida! ` + (e?.response?.data?.erro || ''));
        }
        },
        usuarioLogadoCurtiuPostagem () {
            return this.listaDeCurtidasPostagem[0].includes(this.usuarioLogado.id)
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
<div className="postagem" v-for="item in listaDePostagens">
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
                        Curtido por <strong> {{item.curtidas.length}} pessoas</strong>
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
                        <div className="comentario" v-for="(comentario, index) in listaDeComentariosDasPostagens[0]" :key="index">
                            <strong className="nomeUsuario">{{comentario.nome}}</strong>
                            <p className="descricao">{{comentario.mensagem}}</p>
                        </div>
                </div>
            </div>

                <Comentario 
                    v-if="deveExibirSecaoParaComentar == true"
                    v-model="receberComentario"
                    :comentar="comentar"
                />
        </div>
</template>

<style src="./feed.scss" lang="sass"/>

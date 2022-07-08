<script>
  import Comentario from './Comentario.vue'
  import Avatar from '../avatar/Avatar.vue'
  import { useStore } from 'vuex';
  import { reactive, onMounted, ref, watchEffect, inject, computed } from 'vue'


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
    const usuarioLogado = inject('usuarioLogado')
    console.log(usuarioLogado)
    
    //carrega a Lista de Postagens
    const listaDePostagens = ref([])
    const idPostagem = ref('')
    const listaDeCurtidasPostagem = ref([''])
    const listaDeComentariosDasPostagens = ref([])
    const deveExibirSecaoParaComentar = ref(false)
    const tamanhoAtualDaDescricao = ref(90)
    const receberComentario = ref('')

    console.log("receberComentario", receberComentario)

    const imagens = {
        imagemCurtir: imgCurtir,
        imagemCurtido: imgCurtido,
        imagemComentarioAtivo: imgComentarioAtivo,
        imagemComentarioCinza: imgComentarioCinza
    }
        
    //---->>> esperar a API fazer o fetch (no Componente Pai), para então receber as props corretamente
     watchEffect(() => {{
        listaDePostagens.value = props.postagens.listaDePostagens
        listaDeCurtidasPostagem.value = props.postagens.listaDePostagens.map((i) => i.curtidas)
        listaDeComentariosDasPostagens.value = props.postagens.listaDePostagens.map((i) => i.comentarios)
        idPostagem.value = listaDePostagens.value.map((i) => i.id)
     }}, [props.postagens])
     //---->>>

     const alterarCurtida = async () => {
        try {
            await feedService.alterarCurtida(idPostagem.value);
            if (usuarioLogadoCurtiuPostagem()) {
                // tiro o usuario logado da lista de curtidas
                console.log("alterarCurtida if")
                listaDeCurtidasPostagem.value = listaDeCurtidasPostagem.value.filter(idUsuarioQueCurtiu => idUsuarioQueCurtiu !== usuarioLogado.id)
            }
            else { 
                console.log("alterarCurtida else")
                console.log(listaDeCurtidasPostagem.value)
                listaDeCurtidasPostagem.value.push(usuarioLogado.id)
            }
        } catch (e) {
            alert(`Erro ao alterar a curtida! ` + (e?.response?.data?.erro || ''));
        }
    }

     const comentar = async (comentario) => {
        try {
            await feedService.adicionarComentario(idPostagem.value, comentario);
            deveExibirSecaoParaComentar.value = false;
        } catch (e) {
            alert(`Erro ao fazer comentario! ` + (e?.response?.data?.erro || ''));
        }
    }

    const usuarioLogadoCurtiuPostagem = () => listaDeCurtidasPostagem.value.includes(usuarioLogado.id)

    const obterImagemCurtida = () => {
        return usuarioLogadoCurtiuPostagem()
            ? imagens.imagemCurtido
            : imagens.imagemCurtir;
    }

    const obterImagemComentario = () => {
        return deveExibirSecaoParaComentar.value
            ? imagens.imagemComentarioAtivo
            : imagens.imagemComentarioCinza;
    }

    const exibirSecaoParaComentar = () => {
        return deveExibirSecaoParaComentar.value = !deveExibirSecaoParaComentar.value
    }

    const exibirDescricaoCompleta = computed(() => tamanhoAtualDaDescricao(Number.MAX_SAFE_INTEGER))

    const descricaoMaiorQueLimite = computed(() => listaDePostagens.descricao.length > tamanhoAtualDaDescricao)

    const obterDescricao = computed(() => {
        let mensagem = listaDePostagens.descricao.substring(0, tamanhoAtualDaDescricao);
            if (descricaoMaiorQueLimite()) {
                mensagem += '...';
            }
            return mensagem;
    })

        return {
            listaDePostagens, 
            listaDeComentariosDasPostagens,
            idPostagem,
            listaDeCurtidasPostagem,
            imagens,
            deveExibirSecaoParaComentar,
            tamanhoAtualDaDescricao,
            receberComentario,
            comentar,
            alterarCurtida,
            usuarioLogadoCurtiuPostagem,
            exibirDescricaoCompleta,
            obterDescricao,
            obterImagemCurtida,
            obterImagemComentario,
            exibirSecaoParaComentar,
            usuarioLogado
        }
    },
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

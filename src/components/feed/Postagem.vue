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
    console.log("props Postagem", props.postagens)

    const usuarioLogado = inject('usuarioLogado')
    const itensDaPostagem = ref([])
    const listaDeCurtidasPostagem = ref([''])
    const listaDeComentariosDasPostagens = ref([])
    const deveExibirSecaoParaComentar = ref(false)
    const tamanhoAtualDaDescricao = ref(90)
    const receberComentario = ref('')

    itensDaPostagem.value = props.postagens
    listaDeCurtidasPostagem.value = props.postagens.curtidas //(estado para gerenciar as curtidas)
    listaDeComentariosDasPostagens.value = props.postagens.comentarios //(estado para armazenar os arrays de comentários para iterar no html)

    const imagens = {
        imagemCurtir: imgCurtir,
        imagemCurtido: imgCurtido,
        imagemComentarioAtivo: imgComentarioAtivo,
        imagemComentarioCinza: imgComentarioCinza
    }

    const exibirSecaoParaComentar = () => {
        return deveExibirSecaoParaComentar.value = !deveExibirSecaoParaComentar.value
    }

    const exibirDescricaoCompleta = () => tamanhoAtualDaDescricao.value = Number.MAX_SAFE_INTEGER

    const descricaoMaiorQueLimite = () => {
        return itensDaPostagem.value.descricao.length > tamanhoAtualDaDescricao.value
    }
    console.log("descricaoMaiorQueLimite", descricaoMaiorQueLimite())

    const obterDescricao = () => {
        let mensagem = itensDaPostagem.value.descricao.substring(0, tamanhoAtualDaDescricao.value);
            if (descricaoMaiorQueLimite()) {
                mensagem += '...';
            }
            return mensagem;
    }


     const alterarCurtida = async () => {
        try {
            await feedService.alterarCurtida(itensDaPostagem.value.id);
            if (usuarioLogadoCurtiuPostagem()) {
                // tiro o usuario logado da lista de curtidas
                listaDeCurtidasPostagem.value = listaDeCurtidasPostagem.value.filter(idUsuarioQueCurtiu => idUsuarioQueCurtiu !== usuarioLogado.id)
            }
            else { 
                // insiro o usuario logado da lista de curtidas
                listaDeCurtidasPostagem.value.push(usuarioLogado.id)
            }
        } catch (e) {
            alert(`Erro ao alterar a curtida! ` + (e?.response?.data?.erro || ''));
        }
    }

    const usuarioLogadoCurtiuPostagem = () => listaDeCurtidasPostagem.value.includes(usuarioLogado.id)

     const obterImagemCurtida = () => {
        return usuarioLogadoCurtiuPostagem()
            ? imagens.imagemCurtido
            : imagens.imagemCurtir;
    }


     const comentar = async (comentario) => {
        try {
            await feedService.adicionarComentario(itensDaPostagem.value.id, comentario);
            deveExibirSecaoParaComentar.value = false;
        } catch (e) {
            alert(`Erro ao fazer comentario! ` + (e?.response?.data?.erro || ''));
        }
    }

    const obterImagemComentario = () => {
        return deveExibirSecaoParaComentar.value
            ? imagens.imagemComentarioAtivo
            : imagens.imagemComentarioCinza;
    }


        return {
            itensDaPostagem, 
            listaDeComentariosDasPostagens,
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
            descricaoMaiorQueLimite,
            usuarioLogado
        }
    },
  }
</script>

<template>
        <div className="postagem">
                <router-link :to="'/perfil/' + itensDaPostagem.usuario.id">
                    <section className="cabecalhoPostagem">
                        <Avatar :imageProps="itensDaPostagem.usuario.avatar" alt="perfil image"/>
                        <strong>{{itensDaPostagem.usuario.nome}}</strong>
                    </section>
                </router-link>

            <div className="fotoDaPostagem" >
                <img :src="itensDaPostagem.fotoDoPost" alt='foto da postagem' />
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
                        Curtido por <strong> {{listaDeCurtidasPostagem.length}} pessoas</strong>
                    </span>
                </div>
    
                <div className="descricaoDaPostagem">
                    <strong className="nomeUsuario">{{itensDaPostagem.nome}}</strong>
                    <p className="descricao">
                        {{obterDescricao()}}
                        <span
                            v-if="descricaoMaiorQueLimite()"
                            v-on:click="exibirDescricaoCompleta"
                            className="exibirDescricaoCompleta">
                            mais
                        </span>
                    </p>
                </div>

                <div className="comentariosDaPublicacao">
                        <div className="comentario" v-for="(comentario, index) in listaDeComentariosDasPostagens" :key="index">
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

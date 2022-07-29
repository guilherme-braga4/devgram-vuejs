<script>
import { ref, watchEffect, computed } from 'vue'
import Botao from '../../components/botao/Botao.vue'
import CabecalhoComAcoes from "../../components/cabecalhoComAcoes/CabecalhoComAcoes.vue";
import UploadImagem from "../../components/uploadImagem/UploadImagem.vue"
import imagemPublicacao from '../../public/imagens/imagemPublicacao.svg';
import imagemSetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import FeedService from "../../services/FeedService";
import router from '../../router/index'

const limiteDaDescricao = 255;
const descricaoMinima = 3;
const feedService = new FeedService();

export default {
  name: 'Publicacao',
  components: {
    Botao, 
    UploadImagem, 
    CabecalhoComAcoes
  },
  setup() {
    const imagem = ref('')
    const descricao = ref('')
    const inputImagem = ref('')
    const etapaAtual = ref(1)

    console.log("inputImagem", inputImagem)

    watchEffect(() => {
        console.log("inputImagem", inputImagem.value)
        }, [inputImagem.value, imagem.value])

    const estaNaEtapaUm = () => etapaAtual.value === 1;

    const obterTextoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm() && imagem) {
            return 'Cancelar';
        }

        return '';
    }

    const obterTextoDireitaCabecalho = () => {
        if (!imagem) {
            return '';
        }

        if (estaNaEtapaUm()) {
            return 'Avançar';
        }

        return 'Compartilhar';
    }

    const aoClicarAcaoEsquerdaCabecalho = () => {
        console.log("aoClicarAcaoEsquerdaCabecalho", aoClicarAcaoEsquerdaCabecalho)
        if (estaNaEtapaUm()) {
            inputImagem.value = null;
            imagem.value = null;
            return;
        }

        etapaAtual.value = 1;
    }

    const aoClicarAcaoDireitaCabecalho = () => {
        if (estaNaEtapaUm()) {
            etapaAtual.value = 2;
            return;
        }

        publicar();
    }

    const selecionarFoto = () => {
        return console.log(inputImagem?.value, imagem.value)
    }

    const escreverDescricao = (e) => {
        const valorAtual = e.target.value;
        console.log("valorAtual", valorAtual)
        if (valorAtual.length >= limiteDaDescricao) {
            return;
        }

        descricao.value = valorAtual;
    }

    const obterClassNameCabecalho = computed(() => {
        if (estaNaEtapaUm()) {
            return 'primeiraEtapa';
        }

        return 'segundaEtapa';
    })
        
    const publicar = async () => {
        try {
            if (!validarFormulario()) {
                alert('A descrição precisa de pelo menos 3 caracteres e a imagem precisa estar selecionada.');
                return;
            }

            const corpoPublicacao = new FormData();
            corpoPublicacao.append('descricao', descricao.value);
            corpoPublicacao.append('file', imagem.value.arquivo);

            console.log("corpoRequisicao", corpoPublicacao)

            await feedService.fazerPublicacao(corpoPublicacao);
            router.push('/');
        } catch (error) {
            alert('Erro ao salvar publicação!');
        }
    }

    const validarFormulario = () => {
        return (
            descricao.value.length >= descricaoMinima
            && imagem.value.arquivo
        );
    }

    return {
      etapaAtual,
      estaNaEtapaUm,
      obterClassNameCabecalho,
      escreverDescricao,
      aoClicarAcaoDireitaCabecalho,
      aoClicarAcaoEsquerdaCabecalho,
      obterTextoDireitaCabecalho,
      obterTextoEsquerdaCabecalho,
      imagemPublicacao,
      imagemSetaEsquerda,
      imagem,
      inputImagem,
      selecionarFoto
    }
  }
}
</script>

<template>
    <div className="paginaPublicacao largura30pctDesktop">
            <CabecalhoComAcoes
                v-if="imagem?.preview"
                :class="obterClassNameCabecalho"
                :iconeEquerda="estaNaEtapaUm() ? null : imagemSetaEsquerda"
                :textoEsquerda="obterTextoEsquerdaCabecalho()"
                :aoClicarAcaoEsquerda="aoClicarAcaoEsquerdaCabecalho"
                :elementoDireita="obterTextoDireitaCabecalho()"
                :aoClicarElementoDireita="aoClicarAcaoDireitaCabecalho"
                titulo='Nova publicação'
            />


            <div className="conteudoPaginaPublicacao">
                        <div className="primeiraEtapa" v-if="estaNaEtapaUm()">
                            <UploadImagem
                                :imagemPreviewClassName="!imagem ? 'previewImagemPublicacao' : 'previewImagemSelecionada'"
                                :imagemPreview="imagem?.preview || imagemPublicacao"
                                v-model:imagemDoInput="imagem"
                            />
                            <span className="desktop textoDragAndDrop">Arraste sua foto aqui!</span>
                            <Botao
                                texto='Selecionar uma imagem'
                                v-model:referenciaDoInput="inputImagem"
                                :manipularClique="selecionarFoto"
                            />
                        </div>

                        <div className="segundaEtapa" v-else>
                            <UploadImagem
                                    :imagemPreview="imagem?.preview"
                                    v-model="imagem"
                                />

                            <textarea
                                :rows="3"
                                :value="descricao"
                                placeholder='Escreva uma legenda...'
                                @input="escreverDescricao"
                            ></textarea>
                        </div>
            </div>
        </div>
</template>
<script>
import { ref, watchEffect } from 'vue'
import Botao from '../../components/botao/Botao.vue'
// import CabecalhoComAcoes from "../../componentes/cabecalhoComAcoes";
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
    Botao, UploadImagem
  },
  setup() {
    const imagem = ref('')
    const descricao = ref('')
    const inputImagem = ref('')
    const etapaAtual = ref('')

    watchEffect(() => {console.log("imagem", imagem.value.preview)}, [imagem.value])

    console.log("imagem", imagem.value)

    const estaNaEtapaUm = () => etapaAtual.value = 1;
    console.log(estaNaEtapaUm())

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

    const escreverDescricao = (e) => {
        const valorAtual = e.target.value;
        if (valorAtual.length >= limiteDaDescricao) {
            return;
        }

        descricao.value = valorAtual;
    }

    const obterClassNameCabecalho = () => {
        if (estaNaEtapaUm()) {
            return 'primeiraEtapa';
        }

        return 'segundaEtapa';
    }

    const publicar = async () => {
        try {
            if (!validarFormulario()) {
                alert('A descrição precisa de pelo menos 3 caracteres e a imagem precisa estar selecionada.');
                return;
            }

            const corpoPublicacao = new FormData();
            corpoPublicacao.append('descricao', descricao);
            corpoPublicacao.append('file', imagem.arquivo);

            await feedService.fazerPublicacao(corpoPublicacao);
            router.push('/');
        } catch (error) {
            alert('Erro ao salvar publicação!');
        }
    }

    const validarFormulario = () => {
        return (
            descricao.length >= descricaoMinima
            && imagem?.arquivo
        );
    }

    return {
      estaNaEtapaUm,
      obterClassNameCabecalho,
      escreverDescricao,
      aoClicarAcaoDireitaCabecalho,
      aoClicarAcaoEsquerdaCabecalho,
      obterTextoDireitaCabecalho,
      obterTextoEsquerdaCabecalho,
      imagemPublicacao,
      imagemSetaEsquerda,
      imagem
    }
  }
}
</script>

<template>
    <div className="paginaPublicacao largura30pctDesktop">
            <!-- <CabecalhoComAcoes
                className={obterClassNameCabecalho()}
                iconeEquerda={estaNaEtapaUm() ? null : imagemSetaEsquerda}
                textoEsquerda={obterTextoEsquerdaCabecalho()}
                aoClicarAcaoEsquerda={aoClicarAcaoEsquerdaCabecalho}
                elementoDireita={obterTextoDireitaCabecalho()}
                aoClicarElementoDireita={aoClicarAcaoDireitaCabecalho}
                titulo='Nova publicação'
            /> -->

            <hr className='linhaDivisoria' />

            <div className="conteudoPaginaPublicacao">
                        <div className="primeiraEtapa" v-if="estaNaEtapaUm()">
                            <UploadImagem
                                :imagem="imagem"
                                :aoSetarAReferencia="inputImagem"
                                :imagemPreviewClassName="!imagem ? 'previewImagemPublicacao' : 'previewImagemSelecionada'"
                                :imagemPreview="imagem?.preview || imagemPublicacao"
                                v-model="imagem"
                            />
                            <span className="desktop textoDragAndDrop">Arraste sua foto aqui!</span>
                            <Botao
                                texto='Selecionar uma imagem'
                                :manipularClique="() => inputImagem?.click()"
                            />
                        </div>



                            <div className="segundaEtapa" v-else="estaNaEtapaUm()">
                                <UploadImagem
                                    :imagem="imagem"
                                    :imagemPreview="imagem?.preview"
                                />

                                <textarea
                                    rows={3}
                                    value={descricao}
                                    placeholder='Escreva uma legenda...'
                                    onChange={escreverDescricao}
                                ></textarea>
                                
                            </div>
            </div>
        </div>
</template>
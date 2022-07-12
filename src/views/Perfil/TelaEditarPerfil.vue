<script>
import {ref, reactive, watchEffect, computed, inject} from 'vue'
import UploadImagem from '../../components/uploadImagem/UploadImagem.vue'
import CabecalhoComAcoes from '../../components/cabecalhoComAcoes/CabecalhoComAcoes.vue'
import imgAvatarPadrao from '../../public/imagens/avatar.svg';
import imgLimpar from '../../public/imagens/limpar.svg';
import UsuarioService from '../../services/UsuarioService';
import { validarNome } from '../../utils/validadores';
import router from '../../router/index'

const usuarioService = new UsuarioService();

 export default{
    name: 'TelaEditarPerfil',
    components: {
        CabecalhoComAcoes, 
        UploadImagem, 
    },
    setup (props) {
    // console.log("props TelaEditarPerfil", props)
    const usuarioLogado = inject('usuarioLogado')    
    const novoAvatar = ref('')
    const inputAvatar = ref('');
    const nome = ref('');

    watchEffect(() => {
        if (!usuarioLogado) {
            return;
        }

        console.log("usuarioLogado", usuarioLogado)
        console.log("novoAvatar.value", novoAvatar.value)

        nome.value = usuarioLogado.nome
        novoAvatar.value == '' ? novoAvatar.value = usuarioLogado.avatar : novoAvatar.value
        console.log("novoAvatar", novoAvatar.value)
    }, [inputAvatar.value]);

    const atualizarPerfil = async () => {
        try {
            if (!validarNome(nome.value)) {
                alert('Nome precisa de pelo menos 2 caracteres!');
                return;
            }

            const corpoRequisicao = new FormData();
            corpoRequisicao.append('nome', nome.value);

            if (novoAvatar.value.arquivo) {
                corpoRequisicao.append('file', novoAvatar.value.arquivo);
            }

            console.log("corpoRequisicao", corpoRequisicao)

            await usuarioService.atualizarPerfil(corpoRequisicao);
            localStorage.setItem('nome', nome.value);

            if (novoAvatar.value.arquivo) {
                localStorage.setItem('avatar', novoAvatar.value.preview);
            }

            router.push('/perfil/eu');
        } catch (error) {
            alert(`Erro ao editar perfil!`);
        }
    }

    const aoCancelarEdicao = () => {
        router.push('/perfil/eu');
    }

    const abrirSeletorDeArquivos = () => {
        console.log("inputAvatar", inputAvatar)
        inputAvatar?.value?.click();
    }

    const alterarNome = (e) => {
        nome.value = e.target.value
        console.log("nome.value", nome.value)
    }

        return {
            nome,
            novoAvatar,
            imgAvatarPadrao,
            imgLimpar,
            atualizarPerfil,
            aoCancelarEdicao,
            abrirSeletorDeArquivos,
            alterarNome
        }
     }
}


</script>

<template>

     <div className='paginaEditarPerfil largura30pctDesktop'>
            <div className='conteudoPaginaEditarPerfil'>
                <CabecalhoComAcoes
                    titulo='Editar perfil'
                    :aoClicarAcaoEsquerda="aoCancelarEdicao"
                    textoEsquerda='Cancelar'
                    elementoDireita='Concluir'
                    :aoClicarElementoDireita="atualizarPerfil"
                />

                <hr className='linhaDivisoria' />

                <div className='edicaoAvatar'>
                    <UploadImagem
                        :aoSetarAReferencia="inputAvatar"
                        imagemPreviewClassName='avatar'
                        :imagemPreview="novoAvatar?.preview === undefined ? (novoAvatar || imgAvatarPadrao) : novoAvatar?.preview"
                        v-model="novoAvatar"
                    />

                    <span v-on:click="abrirSeletorDeArquivos">Alterar foto do perfil</span>
                </div>

                <hr className='linhaDivisoria' />

                <div className='edicaoNome'>
                    <label>Nome</label>
                    <input
                        type='text'
                        :value="nome"
                        @input="alterarNome"
                    />
                    <img
                        :src="imgLimpar"
                        alt='icone limpar'
                        :width="16"
                        :height="16"
                    />
                </div>

                <hr className='linhaDivisoria' />
            </div>
        </div>

</template>

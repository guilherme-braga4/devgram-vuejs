<script>
import { onMounted, computed, reactive, ref } from "vue";
import InputPublico from '../../components/inputPublico/InputPublico.vue'
import Botao from '../../components/botao/Botao.vue'
import UploadImagem from '../../components/uploadImagem/UploadImagem.vue'
import avatar from "../../public/imagens/avatar.svg";
import envelope from "../../public/imagens/envelope.svg";
import chave from "../../public/imagens/chave.svg";
import router from '../../router/index'

import { validarEmail, validarSenha, validarNome, validarConfirmacaoSenha } from "../../utils/validadores";

import UsuarioService from "../../services/UsuarioService";


const usuarioService = new UsuarioService();

export default {
  name: 'Cadastro',
  components: {
    InputPublico, 
    Botao, 
    UploadImagem
  },
  setup () {
    const estaSubmetendo = ref(false)
    const user = reactive({
            nome: "",
            email: "",
            senha: "",
    })

    const validarFormulario = () => {
        return (
            validarNome(user.nome) 
            && validarEmail(user.email)
            && validarSenha(user.senha)
            && validarConfirmacaoSenha(user.senha, user.confirmar_senha)
        );
    }

    const submitForm = async (event) => {
        event.preventDefault()

        if (!validarFormulario()) {
            return;
        }

        estaSubmetendo.value = true
  
            try {
            const corpoReqCadastro = new FormData();
            corpoReqCadastro.append("nome", user.nome);
            corpoReqCadastro.append("email", user.email);
            corpoReqCadastro.append("senha", user.senha);

            // if (imagem?.arquivo) {
            //     corpoReqCadastro.append("file", imagem.arquivo);
            // }

            await usuarioService.cadastro(corpoReqCadastro);
            await usuarioService.login({
                login: user.email,
                senha: user.senha
            });

            estaSubmetendo.value = false

            router.push({ path: "/" })          
        } catch (error) {
            alert(
                "Erro ao cadastrar usuario. " + error?.response?.data?.erro
            );
        }
    }
      return {
        user,
        avatar,
        envelope,
        chave,
        submitForm,
        validarFormulario,
        estaSubmetendo
        }
    }  
}

</script>

<template>
  <section v-bind:class="['paginaCadastro', 'paginaPublica']">
        <div className="logoContainer desktop">
                <img 
                alt="Logo Devagram" 
                className="logo"
                src="../../public/imagens/logo.svg" 
                />
        </div>
        <div className="conteudoPaginaPublica">
                <form>
                    <UploadImagem/>
                    <InputPublico
                        texto="Nome Completo"
                        tipo="text"
                        v-model="user.nome"
                        :icone="avatar"
                    />
                    <InputPublico
                        texto="E-mail"
                        tipo="email"
                        v-model="user.email"
                        :icone="envelope"
                    />
                    <InputPublico
                        texto="Senha"
                        tipo="password"
                        v-model="user.senha"
                        :icone="chave"
                    />
                    <InputPublico
                        texto="Confirmar Senha"
                        tipo="password"
                        v-model="user.confirmar_senha"
                        :icone="chave"
                    />
                    <Botao
                        texto="Cadastrar"
                        tipo="submit"
                        :desabilitado="!validarFormulario() || estaSubmetendo"
                        v-on:click="submitForm($event)"
                    />
                </form>
                <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <router-link to="/">Faça seu login agora!</router-link>
                </div>
            </div>
    </section>
  </template>

<style src="./TelaCadastro.scss" lang="sass" scoped/>


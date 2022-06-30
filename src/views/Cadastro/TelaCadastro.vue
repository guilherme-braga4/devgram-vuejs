<script>
import InputPublico from '../../components/inputPublico/InputPublico.vue'
import Botao from '../../components/botao/Botao.vue'
import UploadImagem from '../../components/uploadImagem/UploadImagem.vue'
import avatar from "../../public/imagens/avatar.svg";
import envelope from "../../public/imagens/envelope.svg";
import chave from "../../public/imagens/chave.svg";

import { validarEmail, validarSenha, validarNome, validarConfirmacaoSenha } from "../../utils/validadores";

import UsuarioService from "../../services/UsuarioService";


import { useStore } from 'vuex';
import { onMounted, computed } from "vue";



// import imagemUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";


const usuarioService = new UsuarioService();

export default {
  name: 'Cadastro',
  components: {
    InputPublico, 
    Botao, 
    UploadImagem
  },
  setup () {
    const store = useStore();
    const estaSubmetendo = store.state.usuario.estaSubmetendo
    console.log(estaSubmetendo)
    return {estaSubmetendo}
  },    
  data () {
     return {
        user: {
            nome: "",
            email: "",
            senha: "",
        },
        user_icon: avatar,
        email_icon: envelope,
        password_icon: chave,
    }
  },
  methods: {
    validarFormulario () {
        return (
            validarNome(this.user.nome)
            && validarEmail(this.user.email)
            && validarSenha(this.user.senha)
            && validarConfirmacaoSenha(this.user.senha, this.user.confirmar_senha)
        );
    },
    async submitForm(e) {
      e.preventDefault()

        if (!this.validarFormulario()) {
            return;
        }

        this.state.estaSubmetendo = true
  
            try {
            const corpoReqCadastro = new FormData();
            corpoReqCadastro.append("nome", this.user.nome);
            corpoReqCadastro.append("email", this.user.email);
            corpoReqCadastro.append("senha", this.user.senha);

            // if (imagem?.arquivo) {
            //     corpoReqCadastro.append("file", imagem.arquivo);
            // }

            await usuarioService.cadastro(corpoReqCadastro);
            await usuarioService.login({
                login: this.user.email,
                senha: this.user.senha
            });
            
            this.$router.push({ path: "/" })
            
        } catch (error) {
            alert(
                "Erro ao cadastrar usuario. " + error?.response?.data?.erro
            );
        }

        this.state.estaSubmetendo = false;
    },
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
                        :icone="user_icon"
                    />
                    <InputPublico
                        texto="E-mail"
                        tipo="email"
                        v-model="user.email"
                        :icone="email_icon"
                    />
                    <InputPublico
                        texto="Senha"
                        tipo="password"
                        v-model="user.senha"
                        :icone="password_icon"
                    />
                    <InputPublico
                        texto="Confirmar Senha"
                        tipo="password"
                        v-model="user.confirmar_senha"
                        :icone="password_icon"
                    />
                    <Botao
                        texto="Cadastrar"
                        tipo="submit"
                        :desabilitado="!validarFormulario() || estaSubmetendo"
                        v-on:click="submitForm"
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


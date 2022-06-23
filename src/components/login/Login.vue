<script>
import InputPublico from '../../components/inputPublico/InputPublico.vue'
import Botao from '../../components/botao/Botao.vue'
import UploadImagem from '../../components/uploadImagem/UploadImagem.vue'
import envelope from "../../public/imagens/envelope.svg";
import chave from "../../public/imagens/chave.svg";
import { validarEmail, validarSenha } from "../../utils/validadores";
// import imagemUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";

import UsuarioService from "../../services/UsuarioService";

import { useStore } from 'vuex';
import { onMounted, computed } from "vue";

const usuarioService = new UsuarioService();

console.log("TelaCadastro")

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
            email: "",
            senha: "",
        },
        email_icon: envelope,
        password_icon: chave
    }
  },
  methods: {
    validarFormulario () {
        return (
            validarEmail(this.user.email)
            && validarSenha(this.user.senha)
        );
    },
    async submitForm(e) {
      e.preventDefault()
  
       if (!this.validarFormulario()) {
            return;
        }

        this.estaSubmetendo = true;

        try {
            await usuarioService.login({
                login: this.user.email,
                senha: this.user.senha
            });

            // if (aposAutenticacao) {
            //     aposAutenticacao();
            // }
            
        } catch (error) {
            alert(
                "Erro ao realizar o login. " + error?.response?.data?.erro
            );
        }

        this.estaSubmetendo = false
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
                    <Botao
                        texto="Login"
                        tipo="submit"
                        :desabilitado="!validarFormulario() || estaSubmetendo"
                        v-on:click="submitForm"
                    />
                </form>
                <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <router-link to="/cadastro">Faça seu cadastro agora!</router-link>
                </div>
            </div>
    </section>
  </template>

<!-- <style src="./TelaCadastro.scss" lang="sass" scoped/> -->


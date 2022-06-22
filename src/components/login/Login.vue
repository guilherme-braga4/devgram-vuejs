<script>
import InputPublico from '../../components/inputPublico/InputPublico.vue'
import Botao from '../../components/botao/Botao.vue'
import UploadImagem from '../../components/uploadImagem/UploadImagem.vue'
import envelope from "../../public/imagens/envelope.svg";
import chave from "../../public/imagens/chave.svg";
import { validarEmail, validarSenha } from "../../utils/validadores";
// import imagemUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";

import { useStore } from 'vuex';
import { onMounted, computed } from "vue";

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
    submitForm(e) {
      e.preventDefault()
      console.log(this.user);
    },
     validarFormulario () {
        return (
            this.email == "gui@gmail.com"
            && this.senha == "123"
        );
    },
    validarFormulario () {
        return (
            validarEmail(this.user.email)
            && validarSenha(this.user.senha)
        );
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


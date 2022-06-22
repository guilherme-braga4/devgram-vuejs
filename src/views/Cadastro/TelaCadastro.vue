<script>
import InputPublico from '../../components/inputPublico/InputPublico.vue'
import Botao from '../../components/botao/Botao.vue'
import UploadImagem from '../../components/uploadImagem/UploadImagem.vue'
import avatar from "../../public/imagens/avatar.svg";
import envelope from "../../public/imagens/envelope.svg";
import chave from "../../public/imagens/chave.svg";

import { useStore } from 'vuex';
import { onMounted, computed } from "vue";

// import imagemUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";

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
            nome: "",
            email: "",
            senha: "",
            confirmar_senha: "",
            label_teste: "123"
        },
        user_icon: avatar,
        email_icon: envelope,
        password_icon: chave,
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
            && this.senha == 123
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


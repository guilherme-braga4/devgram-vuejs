<script>
import InputPublico from '../../components/inputPublico/InputPublico.vue'
import Botao from '../../components/botao/Botao.vue'
console.log("TelaCadastro")

export default {
  name: 'Cadastro',
  components: {
    InputPublico, 
    Botao
  },
  data () {
     return {
        user: {
            nome: "",
            email: "",
            senha: "",
            confirmar_senha: "",
            label_teste: "123"
        }
    }
  },
  methods: {
    submitForm(e) {

      e.preventDefault()

      console.log(this.user);
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
                        texto="Nome Completo"
                        tipo="text"
                        v-model="user.nome"
                        label="Nome Completo"
                    />
                    <InputPublico
                        texto="E-mail"
                        tipo="email"
                        v-model="user.email"
                        label="Email"
                    />
                    <InputPublico
                        texto="Senha"
                        tipo="password"
                        v-model="user.senha"
                        label="Senha"
                    />
                    <InputPublico
                        texto="Confirmar Senha"
                        tipo="password"
                        v-model="user.confirmar_senha"
                        label="Confirme a Senha"
                    />
                    <Botao
                        texto="Cadastrar"
                        tipo="submit"
                        value="Enviar" 
                        v-on:click="submitForm"
                    >
                      Cadastrar
                    </Botao>
                </form>
                <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <p>Faça seu login agora!</p>
                </div>
            </div>
    </section>
  </template>

<style src="./TelaCadastro.scss" lang="sass" scoped/>


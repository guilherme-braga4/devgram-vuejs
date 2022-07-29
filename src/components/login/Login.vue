<script>
import { ref, reactive, inject, provide, watchEffect } from 'vue'
import InputPublico from '../../components/inputPublico/InputPublico.vue'
import Botao from '../../components/botao/Botao.vue'
import UploadImagem from '../../components/uploadImagem/UploadImagem.vue'
import envelope from '../../public/imagens/envelope.svg'
import chave from '../../public/imagens/chave.svg'
import { validarEmail, validarSenha } from '../../utils/validadores'
import router from '../../router/index'
import UsuarioService from '../../services/UsuarioService'

const usuarioService = new UsuarioService()

export default {
  name: 'Login',
  props: {
    setToken: '',
    setUser: ''
  },
  components: {
    InputPublico,
    Botao,
    UploadImagem
  },
  setup({ setToken, setUser }) {
    const estaSubmetendo = ref(false)
    const user = reactive({
      email: '',
      senha: ''
    })

    const validarFormulario = () => {
      return validarEmail(user.email) && validarSenha(user.senha)
    }

    const submitForm = async event => {
      event.preventDefault()

      if (!validarFormulario()) {
        return
      }

      estaSubmetendo.value = true

      try {
        await usuarioService.login({
          login: user.email,
          senha: user.senha
        })
        const getToken = usuarioService.obterToken()
        setToken(getToken)
        const getUser = usuarioService.obterInformacoesDoUsuarioLogado()
        setUser(getUser)
        router.push('/')
      } catch (error) {
        alert('Erro ao realizar o login. ' + error?.response?.data?.erro)
      }
      estaSubmetendo.value = false
    }

    return {
      user,
      envelope,
      chave,
      submitForm,
      validarFormulario
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
          :icone="envelope"
        />
        <InputPublico
          texto="Senha"
          tipo="password"
          v-model="user.senha"
          :icone="chave"
        />
        <Botao
          texto="Login"
          tipo="submit"
          :desabilitado="!validarFormulario() || estaSubmetendo"
          v-on:click="submitForm($event)"
        />
      </form>
      <div className="rodapePaginaPublica">
        <p>Já possui uma conta?</p>
        <router-link to="/cadastro">Faça seu cadastro agora!</router-link>
      </div>
    </div>
  </section>
</template>

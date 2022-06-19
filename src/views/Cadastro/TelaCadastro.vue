<script>
import InputPublico from '../../components/inputPublico/InputPublico.vue'
console.log("TelaCadastro")
export default {
  name: 'Cadastro',
  components: {
    InputPublico
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
                <form onSubmit={aoSubmeter}>
                    <InputPublico
                        texto="Nome Completo"
                        tipo="text"
                    />
                    <InputPublico
                        texto="E-mail"
                        tipo="email"
                    />
                    <InputPublico
                        texto="Senha"
                        tipo="password"
                    />
                    <InputPublico
                        texto="Confirmar Senha"
                        tipo="password"
                    />
                    <button
                        texto="Cadastrar"
                        tipo="submit"
                    >
                      Cadastrar
                    </button>
                </form>
                <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <p>Faça seu login agora!</p>
                </div>
            </div>
    </section>
  </template>

<style src="./TelaCadastro.scss" lang="sass" scoped/>


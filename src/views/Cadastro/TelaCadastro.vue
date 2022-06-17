<script>

console.log("TelaCadastro")

</script>

<template>
  <section v-bind:class="['paginaCadastro', 'paginaPublica']">
  <!-- <section className="paginaPublica"> -->
            <!-- <div className="logoContainer desktop"> -->
                <img alt="Logo Devagram" class="logo" src="../../public/imagens/logo.svg" width="125" height="125" />
            <!-- </div> -->
            <div className="uploadImagemContainer">
                <form onSubmit={aoSubmeter}>
                   
                    <input
                        texto="Nome Completo"
                        tipo="text"
                    />
                    <input
                        texto="E-mail"
                        tipo="email"
                    />
                    <input
                        texto="Senha"
                        tipo="password"
                    />
                    <input
                        texto="Confirmar Senha"
                        tipo="password"
                    />
                    <button
                        texto="Cadastrar"
                        tipo="submit"
                    >
                      AAAAAAAAAAAAAAAA
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


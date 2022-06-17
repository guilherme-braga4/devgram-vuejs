<script>

console.log("TelaCadastro")

</script>

<template>
  <div className="bbb">aaaa</div>
  <section v-bind:class="['paginaCadastro', 'paginaPublica']">
  <!-- <section className="paginaPublica"> -->
            <div className="logoContainer desktop">
                <Image
                    src={imagemLogo}
                    alt="logotipo"
                    className="logo"
                />
            </div>
            <div className="uploadImagemContainer">
                <form onSubmit={aoSubmeter}>
                    <!-- <UploadImagem
                        imagemPreviewClassName="avatar avatarPreview"
                        imagemPreview={imagem?.preview || imagemAvatar.src}
                        setImagem={setImagem}
                    /> -->

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


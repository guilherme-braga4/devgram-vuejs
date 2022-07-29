<script>
import {
  ref,
  watchEffect,
  inject,
  onMounted,
  onUpdated,
  onUnmounted
} from 'vue'
import Feed from '../../components/feed/Feed.vue'
import CabecalhoPerfil from '../../components/cabecalhoPerfil/CabecalhoPerfil.vue'
import UsuarioService from '../../services/UsuarioService'
import router from '../../router/index'

const usuarioService = new UsuarioService()

export default {
  name: 'Perfil',
  components: {
    CabecalhoPerfil,
    Feed
  },
  setup() {
    const usuario = ref({})
    const usuarioLogado = inject('usuarioLogado')

    const obterPerfil = async idUsuario => {
      try {
        const { data } = await usuarioService.obterPerfil(
          estaNoPerfilPessoal() ? usuarioLogado?.id : idUsuario
        )
        return data
      } catch (error) {
        console.log(`Erro ao obter o perfil do usuário!`)
      }
    }

    const estaNoPerfilPessoal = () => {
      return router.currentRoute.value.params.id === 'eu'
    }

    watchEffect(async () => {
      if (!router.currentRoute.value.params.id) {
        return
      }
      usuario.value = []
      const dadosPerfil = await obterPerfil(router.currentRoute.value.params.id)
      usuario.value = dadosPerfil //-->> Dados do Usuário (Diferente de Usuário Logado, é o perfil Atual que está sendoe exibido)
    }, [router.currentRoute.value.params.id])

    return {
      usuario,
      estaNoPerfilPessoal
    }
  }
}
</script>

<template>
  <div className="paginaPerfil">
    <CabecalhoPerfil
      :usuarioLogado="usuarioLogado"
      :usuario="usuario"
      :estaNoPerfilPessoal="estaNoPerfilPessoal()"
    />

    <Feed :usuarioPerfilAtual="usuario" />
  </div>
</template>

<style src="./perfil.scss" lang="scss" />

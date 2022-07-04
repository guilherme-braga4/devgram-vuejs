import UsuarioService from "../services/UsuarioService"
import { h } from "@vue/runtime-core"
import store from '../store/index'
import Cabecalho from '../components/layout/Cabecalho.vue'


const usuarioService = new UsuarioService();

function comAutorizacao(Componente) {
  console.log("cheguei em comAutorizacao")
  return {
    created() {
      console.log('HOC component created')
      if (typeof window !== 'undefined') {
        if (!usuarioService.estaAutenticado()) {
            // router.replace('/');
            return null;
        }
        store.state.usuario.usuarioLogado = usuarioService.obterInformacoesDoUsuarioLogado();
        console.log("usuarioLogado 21", store.state.usuario.usuarioLogado)
        //usuario Logado é armazenado em um Estado
      }
    },
    render() {
      return (
        h(Componente)
      )
    }
  }
}

export default comAutorizacao

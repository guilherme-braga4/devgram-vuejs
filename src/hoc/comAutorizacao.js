import UsuarioService from "../services/UsuarioService"
import { h } from "@vue/runtime-core"
import store from '../store/index'

let usuarioLogado = store.state.usuario.usuarioLogado
console.log("usuarioLogado", usuarioLogado)

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
        usuarioLogado = usuarioService.obterInformacoesDoUsuarioLogado();
         console.log("usuarioLogado 21", usuarioLogado)
        //usuario Logado é armazenado em um Estado
      }
    },
    render() {
      return (
      // h(Cabecalho)
      h(Componente)
      // h(Rodape)
      )
    }
  }
}

export default comAutorizacao

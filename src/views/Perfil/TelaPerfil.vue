<script>
import {ref, watchEffect, inject} from 'vue'
import Feed from '../../components/feed/Feed.vue';
import CabecalhoPerfil from '../../components/cabecalhoPerfil/CabecalhoPerfil.vue';
import UsuarioService from '../../services/UsuarioService';
import router from '../../router/index'

const usuarioService = new UsuarioService();

export default {
    name: 'Perfil',
    components: {
       CabecalhoPerfil,
       Feed
    },
    props: {
        usuarioLogado: ''
    },
    setup (props) {
    const usuarioLogado = inject('usuarioLogado')
    // console.log("router", router.currentRoute.value.params.id)

    const usuario = ref({});

    const obterPerfil = async (idUsuario) => {
        try {
            const { data } = await usuarioService.obterPerfil(
                estaNoPerfilPessoal()
                    ? usuarioLogado.id
                    : idUsuario
            );
            return data;
        } catch (error) {
            alert(`Erro ao obter o perfil do usuário!`);
        }
    }

    const estaNoPerfilPessoal = () => {
        return router.currentRoute.value.params.id === 'eu';
    }

    watchEffect(async () => {
        if (!router.currentRoute.value.params.id) {
            return;
        }
        const dadosPerfil = await obterPerfil(router.currentRoute.value.params.id);
        usuario.value = dadosPerfil //-->> Dados do Usuário (Diferente de Usuário Logado, é o perfil Atual que está sendoe exibido)
        console.log("usuario.value", usuario.value)
    }, [router.currentRoute.value.params.id]);

        return {
            usuario,
            estaNoPerfilPessoal
        }
    }
}
</script>

<template>
     <div className='paginaPerfil'>
            <CabecalhoPerfil
                :usuarioLogado="usuarioLogado"
                :usuario="usuario"
                :estaNoPerfilPessoal="estaNoPerfilPessoal()"
            />

            <Feed
                :usuarioPerfilAtual="usuario"
            />
        </div>
</template>

<style src="./perfil.scss" lang="scss"/>
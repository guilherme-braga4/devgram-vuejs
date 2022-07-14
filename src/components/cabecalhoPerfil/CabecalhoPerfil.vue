<script>
import { ref, watchEffect } from 'vue'
import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import imgLogout from '../../public/imagens/logout.svg';
import CabecalhoComAcoes from '../cabecalhoComAcoes/CabecalhoComAcoes.vue';
import Botao from '../botao/Botao.vue';
import Avatar from '../avatar/Avatar.vue';
import UsuarioService from '../../services/UsuarioService';
import router from '../../router/index'

const usuarioService = new UsuarioService();

export default {
    name: 'CabecalhoPerfil',
    props: {
        usuario: '',
        estaNoPerfilPessoal: ''
    },
    components: {
        CabecalhoComAcoes, 
        Botao, 
        Avatar
    },
    setup (props) {
    console.log("props CabecalhoPerfil", props)
    const estaSeguindoOUsuario = ref(false);
    const quantidadeSeguidores = ref(0);

    watchEffect(() => {
        if (!props.usuario) {
            return;
        }

        estaSeguindoOUsuario.value = props.usuario.segueEsseUsuario;
        quantidadeSeguidores.value = props.usuario.seguidores;
    }, [props.usuario]);

    const obterTextoBotaoPrincipal = () => {
        if (props.estaNoPerfilPessoal) {
            return 'Editar perfil';
        }

        if (estaSeguindoOUsuario.value) {
            return 'Deixar de seguir';
        }

        return 'Seguir';
    }

    const obterCorDoBotaoPrincipal = () => {
        if (estaSeguindoOUsuario.value || props.estaNoPerfilPessoal) {
            return 'invertido';
        }

        return 'primaria';
    }

    const manipularCliqueBotaoPrincipal = async () => {
        if (props.estaNoPerfilPessoal) {
            return router.push('/perfil/editar')
        }
        try {
            await usuarioService.alternarSeguir(props.usuario._id);
            estaSeguindoOUsuario.value = !estaSeguindoOUsuario.value;
            quantidadeSeguidores.value = estaSeguindoOUsuario.value ? (quantidadeSeguidores.value + 1): (quantidadeSeguidores.value - 1)
        } catch (error) {
            alert(`Erro ao seguir/deixar de seguir!`);
        }
    }

    const aoClicarSetaEsquerda = () => {
        router.back();
    }

    const logout = () => {
        usuarioService.logout();
        router.push('/');
    }

    const obterElementoDireitaCabecalho = () => {
        if (props.estaNoPerfilPessoal)
            return true 
        else false
        }  
               
                 

        return {
            obterTextoBotaoPrincipal,
            obterCorDoBotaoPrincipal,
            manipularCliqueBotaoPrincipal,
            aoClicarSetaEsquerda,
            logout,
            obterElementoDireitaCabecalho,
            imgSetaEsquerda,
            imgLogout,
            quantidadeSeguidores
            
        }
    }
}
    </script>

<template>
        <div className='cabecalhoPerfil largura30pctDesktop'>
            <CabecalhoComAcoes
                :iconeEquerda="estaNoPerfilPessoal ? null : imgSetaEsquerda"
                :aoClicarAcaoEsquerda="aoClicarSetaEsquerda"
                :titulo="usuario.nome"
                :elementoDireitaPerfil="obterElementoDireitaCabecalho()"
                :imgLogout="imgLogout"
                :logout="logout"
            />

            <hr className='linhaDivisoria' />

            <div className='statusPerfil'>
                <Avatar :imageProps="usuario.avatar" />
                <div className='informacoesPerfil'>
                    <div className='statusContainer'>
                        <div className='status'>
                            <strong>{{usuario.publicacoes}}</strong>
                            <span>Publicações</span>
                        </div>

                        <div className='status'>
                            <strong>{{quantidadeSeguidores}}</strong>
                            <span>Seguidores</span>
                        </div>

                        <div className='status'>
                            <strong>{{usuario.seguindo}}</strong>
                            <span>Seguindo</span>
                        </div>
                    </div>

                    <Botao 
                        :texto="obterTextoBotaoPrincipal()"
                        :cor="obterCorDoBotaoPrincipal()"
                        :manipularClique="manipularCliqueBotaoPrincipal"
                    />
                </div>
            </div>
        </div>
</template>


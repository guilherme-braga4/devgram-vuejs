<script>
import {ref, watchEffect, computed, watch} from 'vue'
import router from '../../router/index'
import imgHomeAtivo from '../../public/imagens/homeAtivo.svg';
import imgHomeCinza from '../../public/imagens/homeCinza.svg';
import imgPublicacaoAtivo from '../../public/imagens/publicacaoAtivo.svg';
import imgPublicacaoCinza from '../../public/imagens/publicacaoCinza.svg';
import imgUsuarioAtivo from '../../public/imagens/usuarioAtivo.svg';
import imgUsuarioCinza from '../../public/imagens/usuarioCinza.svg';

export default {
    name: 'Navegacao', 
    props: {
        className: ''
    },
    setup (props) {
    const rotaAtiva = ref('home')
    const contador = ref(0)
        
    const mapaDeRotas = {
        home: {
            imagemAtivo: imgHomeAtivo,
            rotasAtivacao: ['/'],
            imagemPadrao: imgHomeCinza
        },
        publicacao: {
            imagemAtivo: imgPublicacaoAtivo,
            rotasAtivacao: ['/publicacao'],
            imagemPadrao: imgPublicacaoCinza
        },
        perfil: {
            imagemAtivo: imgUsuarioAtivo,
            rotasAtivacao: ['/perfil/eu', '/perfil/editar'],
            imagemPadrao: imgUsuarioCinza
        }
    }


    //Definindo a Rota Ativa
    //--
    watch(() => {
        /*Trigger -----> */ router.currentRoute.value.path
        const chavesDoMapaDeRotas = Object.keys(mapaDeRotas);
        const indiceAtivo = chavesDoMapaDeRotas.findIndex(chave => {
            return mapaDeRotas[chave].rotasAtivacao.includes(
                window.location.pathname
            );
        });
        console.log('Indice Ativo...', indiceAtivo);
        if (indiceAtivo === -1) {
            rotaAtiva.value = 'home';
        } else {
            rotaAtiva.value = chavesDoMapaDeRotas[indiceAtivo];
        }       
    });

    const obterImagem = (nomeRota) => {
        const rotaAtivada = mapaDeRotas[nomeRota];

        if (rotaAtiva.value === nomeRota) {
            return rotaAtivada.imagemAtivo;
        }

        return rotaAtivada.imagemPadrao;
    }

    const aoClicarNoIcone = (nomeRota) => {
        //Troca a rota Dinamicamente
        rotaAtiva.value = nomeRota
        router.push(mapaDeRotas[nomeRota].rotasAtivacao[0])
    }

    const estilo = computed(() => {
        return `barraNavegacao ${props.className}`
    })

    return {
        estilo,
        aoClicarNoIcone,
        obterImagem
    }
  }
}
</script>

<template>
    <nav :class="estilo">
            <ul>
                <li v-on:click="aoClicarNoIcone('home')">
                    <img
                        :src="obterImagem('home')"
                        alt='icone home'
                        className="iconeNav"
                    />
                </li>

                <li v-on:click="aoClicarNoIcone('publicacao')">
                    <img
                        :src="obterImagem('publicacao')"
                        alt='icone publicacao'
                        className="iconeNav"
                    />
                </li>

                <li v-on:click="aoClicarNoIcone('perfil')">
                    <img
                        :src="obterImagem('perfil')"
                        alt='icone usuario'
                        className="iconeNav"
                    />
                </li>
            </ul>
        </nav>
</template>
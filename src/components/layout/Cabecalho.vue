<script>
import { ref, computed } from 'vue'
import logoHorizontalImg from '../../public/imagens/logoHorizontal.svg';
import imagemLupa from '../../public/imagens/lupa.svg';
import Navegacao from './Navegacao.vue';
import ResultadoPesquisa from './ResultadoPesquisa.vue';
import UsuarioService from '../../services/UsuarioService';
import router from '../../router/index'

const usuarioService = new UsuarioService();

export default {
    name: 'Cabecalho',
    components: {
        Navegacao,
        ResultadoPesquisa
    },
    setup () {
        const resultadoPesquisa = ref([])
        const termoPesquisado = ref ('')
        let cabecalhoClassName = '';

        const estiloHeader = computed(() => {
            if (window && window.location.pathname !== '/') 
                return cabecalhoClassName = 'cabecalhoPrincipal desktop';
            else return 'cabecalhoPrincipal'
        })

        const aoPesquisar = async (e) => {
            termoPesquisado.value = e.target.value;
            resultadoPesquisa.value = [];

            if (e.target.value.length < 3) {
                return;
            }

            try {
                const { data } = await usuarioService.pesquisar(termoPesquisado.value);
                resultadoPesquisa.value = data;
                console.log("resultadoPesquisa.value", resultadoPesquisa.value)
            } catch (e) {
                alert('Erro ao pesquisar usuario. ' + e?.response?.data?.erro);
            }
        }

        const aoClicarResultadoPesquisa = (id) => {
            console.log('aoClicarResultadoPesquisa ID', id)
            resultadoPesquisa.value = [];
            termoPesquisado.value = '';
            router.push(`/perfil/${id}`);
        }

        const redirecionarParaHome = () => {
            router.push('/')
        }

        return { 
            resultadoPesquisa,
            termoPesquisado,
            logoHorizontalImg,
            imagemLupa,
            estiloHeader,
            aoPesquisar,
            aoClicarResultadoPesquisa,
            redirecionarParaHome
        }

    }
}
</script>

<template>
    <header :class="estiloHeader">
            <div className='conteudoCabecalhoPrincipal'>
                <div className='logoCabecalhoPrincipal'>
                    <img
                        :src="logoHorizontalImg"
                        alt='logo devagram'
                        v-on:click="redirecionarParaHome"
                    />
                </div>

                <div className='barraPesquisa'>
                    <div className='containerImagemLupa'>
                        <img
                            :src="imagemLupa"
                            alt='Icone lupa'
                            layout='fill'
                        />
                    </div>
                    <input
                        type='text'
                        placeholder='Pesquisar'
                        :value="termoPesquisado"
                        @input="aoPesquisar"
                    />
                </div>

                <Navegacao className='desktop' />
            </div>

                <div className='resultadoPesquisaContainer' v-if="resultadoPesquisa.length > 0">
                        <ResultadoPesquisa
                            v-for="c in resultadoPesquisa"
                            :avatar="c.avatar"
                            :nome="c.nome"
                            :email="c.email"
                            :key="c._id"
                            :id="c._id"
                            :onClick="aoClicarResultadoPesquisa"
                        />
                </div>
        </header>
</template>

<style src="./cabecalho.scss" lang="scss"/>


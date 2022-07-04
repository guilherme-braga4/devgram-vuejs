<script>
import Avatar from '../avatar/Avatar.vue';

export default {
    name: 'ResultadoPesquisa',
    props: {
        nome: '',
        email: '',
        avatar: '',
        onClick: '',
        id: ''
    },
    setup(props) {
        // const a = computed(() => {})
        return {
            Avatar
        }
    }
}
</script>

<template>
        <div className="resultadoPesquisa" v-on:click="onClick(id)">
            <img :src="Avatar"/>
            <div className='informacoesUsuario'>
                <strong>{{nome}}</strong>
                <span>{{email}}</span>
            </div>
        </div>
</template>
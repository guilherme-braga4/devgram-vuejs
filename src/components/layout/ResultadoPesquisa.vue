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
    components: { Avatar }
}
</script>

<template>
        <div className="resultadoPesquisa" v-on:click="onClick(id)">
            <Avatar :src="avatar"/>
            <div className='informacoesUsuario'>
                <strong>{{nome}}</strong>
                <span>{{email}}</span>
            </div>
        </div>
</template>
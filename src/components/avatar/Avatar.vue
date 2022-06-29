<script>
import avatarImg from '../../public/imagens/avatar.svg';

  export default {
    name: 'Avatar',
    props: {
      imageProps: ''
    },
    data(){
      return {
        useAvatarImg: avatarImg
      }
    },
    methods: {
      escolherAvatar() {
        if (this.imageProps && this.imageProps !== undefined) {
          return this.imageProps
        }
        return this.useAvatarImg
      }
    }
  }    
</script>

<template>
    <img
      :src="escolherAvatar()"
      alt='foto da postagem'
      className='avatar'
    />
    
</template>
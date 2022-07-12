<script>
import avatarImg from '../../public/imagens/avatar.svg';

  export default {
    name: 'Avatar',
    props: {
      imageProps: ''
    },
    setup(props) {
      console.log("props Avatar", props)

      const escolherAvatar = () => {
        // if (props.imageProps && props.imageProps !== undefined) {
          return props.imageProps
        // }
        // return avatarImg
      }
      return {
        escolherAvatar
      }
    }
  }    
</script>

<template>
    <img
      :src="escolherAvatar()"
      alt='foto de avatar'
      className='avatar'
    />
    
</template>
<script>
import Navegacao from "./Navegacao.vue";

export default {
    name: 'Rodape',
    components: {
        Navegacao
    }
}
</script>

<template>
    <footer className="rodape mobile">
        <Navegacao />
    </footer>
</template>

<style src="./rodape.scss" lang="scss"/>
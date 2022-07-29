<script>
import { ref, watchEffect, computed, onMounted } from 'vue'

export default {
  name: 'UploadImagem',
  props: {
    aoSetarAReferencia: '',
    className: '',
    imagemPreview: '',
    imagemPreviewClassName: '',
    referenciaDoInput: '',
    imagemDoInput: ''
  },
  setup(props, context) {
    const referenciaInput = ref(null)

    onMounted(() => referenciaInput.value.focus())

    //Alterar a referência e o state aoSetarReferencia
    watchEffect(() => {
      context.emit('update:referenciaDoInput', referenciaInput.value)
    }, [referenciaInput.value])

    const abrirSeletorArquivos = () => {
      referenciaInput?.value?.click()
    }

    const aoAleterarImagem = () => {
      if (!referenciaInput?.value?.files?.length) {
        return
      }

      const arquivo = referenciaInput?.value?.files[0]
      obterUrlDaImagemEAtualizarEstado(arquivo)
    }

    const obterUrlDaImagemEAtualizarEstado = arquivo => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(arquivo)
      fileReader.onloadend = () => {
        const imagemAtual = {
          preview: fileReader.result,
          arquivo
        }
        context.emit('update:imagemDoInput', imagemAtual)
      }
    }

    const aoSoltarAImagem = e => {
      e.preventDefault()
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const arquivo = e.dataTransfer.files[0]
        obterUrlDaImagemEAtualizarEstado(arquivo)
      }
    }

    const classContainerImagem = computed(
      () => `uploadImagemContainer ${props.className}`
    )

    return {
      referenciaInput,
      abrirSeletorArquivos,
      aoAleterarImagem,
      obterUrlDaImagemEAtualizarEstado,
      aoSoltarAImagem,
      classContainerImagem
    }
  }
}
</script>

<template>
  <div
    :class="classContainerImagem"
    v-on:click="abrirSeletorArquivos()"
    v-on:dragover="e => e.preventDefault()"
    v-on:drop="aoSoltarAImagem"
  >
    <div className="imagemPreviewContainer" v-if="imagemPreview">
      <img
        :src="imagemPreview"
        alt="imagem preview"
        :className="imagemPreviewClassName"
        :value="imagemDoInput"
      />
    </div>

    <input
      type="file"
      className="oculto"
      accept="image/*"
      ref="referenciaInput"
      @input="aoAleterarImagem()"
      :value="referenciaDoInput"
    />
  </div>
</template>

<!-- <style src="" lang="scss"/> -->

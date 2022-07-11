<script>
import {ref, watchEffect, computed, onMounted} from 'vue'

export default {
  name: 'UploadImagem',
  props: {
    aoSetarAReferencia: '',
    className: '',
    imagemPreview: '',
    imagemPreviewClassName: '',
  },
  setup (props, context) {
    const referenciaInput = ref(null)

    onMounted(() => referenciaInput.value.focus())

    watchEffect(() => {
        if (!props.aoSetarAReferencia) {
            return;
        }
        console.log("referenciaInput?.value", referenciaInput?.value)
        props.aoSetarAReferencia = referenciaInput?.value

    }, [referenciaInput?.value]);

    const abrirSeletorArquivos = () => {
        referenciaInput?.value?.click();
    }

    const aoAleterarImagem = () => {
        if (!referenciaInput?.value?.files?.length) {
            return;
        }

         console.log("nova Referência setada", referenciaInput?.value?.files)

        const arquivo = referenciaInput?.value?.files[0];
        obterUrlDaImagemEAtualizarEstado(arquivo);

    }

    const obterUrlDaImagemEAtualizarEstado = (arquivo) => {
        console.log(props)
        const fileReader = new FileReader();
        fileReader.readAsDataURL(arquivo);
        fileReader.onloadend = () => {
            const imagemTeste = {
                preview: fileReader.result,
                arquivo
            };
             context.emit('update:modelValue', imagemTeste);
        }
    }

    const aoSoltarAImagem = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const arquivo = e.dataTransfer.files[0];
            obterUrlDaImagemEAtualizarEstado(arquivo);
        }
    }

    const classContainerImagem = computed(() => `uploadImagemContainer ${props.className}`)

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
   <div :class="classContainerImagem"
            v-on:click="abrirSeletorArquivos()"
            v-on:dragover="e => e.preventDefault()"
            v-on:drop="aoSoltarAImagem()"
        >
                <div className="imagemPreviewContainer" v-if="imagemPreview">
                    <img 
                        :src="imagemPreview"
                        alt='imagem preview'
                        :className="imagemPreviewClassName"
                    />
                </div>

            <input
                type='file'
                className='oculto'
                accept="image/*"
                ref="referenciaInput"
                @input="aoAleterarImagem()"
            />
        </div>
</template>

<!-- <style src="" lang="scss"/> -->
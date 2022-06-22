<script>
export default {
  name: "UploadImagem"
}
</script>

<template>
   <div className="uploadImagemContainer ${className}"
            onClick={abrirSeletorArquivos}
        >
            <!-- {imagemPreview && ( -->
                <div className="imagemPreviewContainer">
                    <img 
                        :src="imagemPreview"
                        alt='imagem preview'
                        className={imagemPreviewClassName}
                    />
                </div>
            <!-- )} -->
            <input
                type='file'
                className='oculto'
                accept="image/*"
                ref={referenciaInput}
                onChange={aoAleterarImagem}
            />
        </div>
</template>

<!-- <style src="" lang="scss"/> -->
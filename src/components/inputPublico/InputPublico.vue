<script>
// defineProps({
//   msg: {
//     type: String,
//     required: true
//   }
// })
console.log("InputPublico")
</script>

<template>
  <div className="inputPublicoContainer">
            <div className="inputPublico">
                <image
                    alt="imagem do campo"
                    className="iconeInputPublico"
                />
                
                <input
                    type={tipo}
                    placeholder="Placeholder"
                />
            </div>
        </div>
</template>

<style src="./InputPublic.scss" lang="sass"/>
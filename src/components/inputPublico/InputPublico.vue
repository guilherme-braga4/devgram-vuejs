<script>
export default {
    name: "InputPublico",
    props: {
        modelValue: '',
        tipo: '',
        icone: {
            default: '',
            type: String
        }
    },
    setup (props, context) {
        const updateValue = (event) => {
             console.log('evento....', event.target.value)
             context.emit('update:modelValue', event.target.value);
        }

        return {
            updateValue
        }
    }
}

</script>

<template>
  <div className="inputPublicoContainer">
            <div className="inputPublico">
                <img 
                    :src="icone" 
                    className="iconeInputPublico" 
                    width="20"
                    height="20"
                />
                <input :type="tipo" :value="modelValue" @input="updateValue"/>
            </div>  
        </div>
</template>

<style src="./InputPublic.scss" lang="sass"/>
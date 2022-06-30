<script>
export default {
    name: "InputPublico",
    props: {
        modelValue: '',
        icone: {
            default: '',
            type: String
        }
    },
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value);
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
                <input type="text" :value="modelValue" @input="updateValue"/>
            </div>  
        </div>
</template>

<style src="./InputPublic.scss" lang="sass"/>
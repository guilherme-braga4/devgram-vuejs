<script>
console.log("InputPublico")

export default {
    name: "InputPublico",
    props: {
        modelValue: '',
        icone: ''
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
                <fa :icon="icone" className="iconeInputPublico"/>
                <input type="text" :value="modelValue" @input="updateValue"/>
            </div>
        </div>
</template>

<style src="./InputPublic.scss" lang="sass"/>
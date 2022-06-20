<script>
console.log("InputPublico")

export default {
    name: "InputPublico",
    props: {
        modelValue: '',
        label: ''
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
                <!-- <image
                    alt="imagem do campo"
                    className="iconeInputPublico"
                /> -->
                <label>
                    {{ label }}
                    <input type="text" :value="modelValue" @input="updateValue" />
                </label>
            </div>
        </div>
</template>

<style src="./InputPublic.scss" lang="sass"/>
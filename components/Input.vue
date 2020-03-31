<template>
    <input type="text" name="content" v-model="inputValue" @focus="$emit('call', inputValue)" />
</template>

<script>
export default {
  name: "Input",
  props: {
      inputValue: {
        type: String,
        required: true,
      }
  }
}
</script>

<style>
input[type="text"] {
    width: 300px;
    margin: 20px;
    padding: 8px 4px;
    font-size: 16pt;
}
</style>
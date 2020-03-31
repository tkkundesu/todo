<template>
  <button @click="$emit('action')">
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button"
}
</script>

<style>
button {
    margin: 0 10px;
    padding: 4px 8px;
    font-size: 10pt;
}
</style>
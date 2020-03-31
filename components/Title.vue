<template>
      <h1>
          <slot />
      </h1>
</template>

<script>
export default {
  name: "Title"
}
</script>

<style>
h1 {
    font-size: 32pt;
    color: red;
}
</style>
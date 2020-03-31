<template>
<ul>
    <li v-for="(todo, index) in todos" :key="index">
        <input type="checkbox" v-model="todo.isdone" @change="$emit('change-check', todo, index)">
        <span :class="{done: todo.isdone}">{{ todo.content }}</span><span :class="{done: todo.isdone}">({{ todo.created }})</span><span @click="$emit('remove', index)" class="command">×</span>
    </li>
    <li v-if="todos.length === 0">Nothing to do!</li>
</ul>
</template>

<script>
export default {
  name: "Todos",
  props: {
    todos: {
        type: Array,
        required: true
    }
  }
}
</script>

<style>

</style>
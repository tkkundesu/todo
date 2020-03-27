<template>
  <section class="container">
    <h1>Todo App({{ todosCount }})</h1>
    <p><input type="text" name="content" v-model="content"  @focus="set_flg"/></p>
    <!-- <pre>{{display_todos}}</pre> -->
    <div>
      <button @click="insert">save</button>
      <button @click="find">find</button>
      <button @click="purge">purge</button>
    </div>
    <ul>
      <li v-for="(todo, index) in display_todos" :key="index">
        <input type="checkbox" v-model="todo.isdone">
        <span :class="{done: todo.isdone}">{{ todo.content }}</span><span :class="{done: todo.isdone}">({{ todo.created }})</span><span @click="remove(todo)" class="command">×</span>
      </li>
      <li v-if="!this.$store.getters.getTodos.length">Nothing to do!</li>
    </ul>
  </section>
</template>

<script>
export default {
  data: function() {
    return {
      content: '',
      find_flg: false,
      todos: []
    }
  },
  computed: {
    display_todos: function() {
      // TODO: 検索条件でフィルタ
      if(this.find_flg) {
        let arr = [];
        let data = this.$store.getters.getTodos;
        data.forEach(element => {
          if(element.content.toLowerCase() == this.content.toLowerCase()) {
            arr.push(element);
          }
        });
        return arr;
      } else {
        return this.$store.getters.getTodos;
      }
    },
    todosCount: function() {
      const todos = this.$store.getters.getTodos
      // TODO: チェックがついてるものをフィルタしてlengthをとる
      const remainTodos = todos.filter(todo => todo.isdone === false)
      return `${remainTodos.length} / ${todos.length}`
    }
  },
  methods: {
    insert: function() {
      let d = new Date();
      const fmt = d.getFullYear()
                  + '-' + ('00' + (d.getMonth() + 1)).slice(-2)
                  + '-' + ('00' + d.getDate()).slice(-2)
                  + ' ' + ('00' + d.getHours()).slice(-2)
                  + ':' + ('00' + d.getMinutes()).slice(-2)
      const todo = {
        content: this.content,
        created: fmt,
        isdone: false
      }
      this.$store.dispatch('setTodo', todo)
    },
    find: function() {
      this.find_flg = true;
    },
    set_flg: function() {
      if(this.find_flg) {
        this.find_flg = false;
        this.content = '';
      }
    },
    remove: function(todo) {
      this.$store.dispatch('remove', todo)
    },
    purge: function() {
      this.$store.dispatch('removeall')
    }
  }
}
</script>

<style>
.container {
    width: 400px;
    margin: 100px auto;
    text-align: center;
}

h1 {
    font-size: 32pt;
    color: red;
}

input[type="text"] {
    width: 300px;
    margin: 20px;
    padding: 8px 4px;
    font-size: 16pt;
}

button {
    margin: 0 10px;
    padding: 4px 8px;
    font-size: 10pt;
}

ul {
    margin-top: 20px;
    padding: 0;
    text-align: center;
}

li {
    list-style: none;
    margin: 5px 0;
    font-size: 14pt;   
}

span {
    margin: 0 5px;
}

li > span.done {
  text-decoration: line-through;
  color: #bbb;
}

.command {
  font-size: 12px;
  cursor: pointer;
  color: #08c;
}
</style>

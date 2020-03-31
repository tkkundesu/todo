<template>
  <section class="container">
    <Title>Todo App({{ todosCount }})</Title>
    <input type="text" name="content" v-model="content" @focus="set_flg" />
    <div>
      <Button @action="insert">save</Button>
      <Button @action="find">find</Button>
      <Button @action="purge">purge</Button>
    </div>
    <Todos :todos="display_todos" @change-check="editTodo" @remove="remove" />
  </section>
</template>

<script>
import Title from "~/components/Title";
import Button from "~/components/Button";
import Todos from "~/components/Todos";
export default {
  name: "index",
    components: {
      Title,
      Button,
      Todos
    },
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
      this.$store.dispatch('setTodo', {todo: todo})
    },
    find: function() {
      this.find_flg = true;
    },
    set_flg: function() {
      if (this.find_flg) {
        this.find_flg = false;
        this.content = '';
      }
    },
    remove: function(index) {
      this.$store.dispatch('remove', index)
    },
    purge: function() {
      this.$store.dispatch('removeall')
    },
    editTodo(todo, index) {
      this.$store.dispatch('setTodo', { todo: todo, index: index })
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

input[type="text"] {
    width: 300px;
    margin: 20px;
    padding: 8px 4px;
    font-size: 16pt;
}
</style>

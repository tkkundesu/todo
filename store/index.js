import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            todos: [
                {content: 'hogehoge', created: '2019-03-31 15:30', isdone: false}, 
                {content: 'fugafuga', created: '2019-03-31 16:00', isdone: false}
            ]
        }),
        mutations: {
            remove: function(state, obj) {
                for(let i = 0; i < state.todos.length; i++) {
                    const ob = state.todos[i];
                    if(ob.content == obj.content && ob.created == obj.created) {
                        alert('remove ' + '"' + ob.content + '"');
                        state.todos.splice(i, 1);
                        return;
                    }
                }
            },
            removeall: function(state) {
                if (!confirm('delete finished?')) {
                    return;
                  }
                  state.todos = [];
            },
            setTodo: (state, todo) => {
                state.todos.unshift(todo)
            }
        },
        actions: {
            setTodo: (ctx, todo) => {
                ctx.commit('setTodo', todo)
            },
            remove: (ctx, todo) => {
                ctx.commit('remove', todo)
            },
            removeall: (ctx) => {
                ctx.commit('removeall')
            }
        },
        getters: {
            getTodos: state => {
                return state.todos
            }
        }
    })
}

export default createStore;
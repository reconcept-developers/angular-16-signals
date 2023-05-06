import {computed, Injectable, signal} from "@angular/core";


export interface Todo {
  label: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoSignal {

  allTodos = signal<Todo[]>([])

  todos = computed(() => {
    return this.allTodos().filter(todo => !todo.done)
  })

  doneTodos = computed(() => {
    return this.allTodos().filter(todo => todo.done)
  })

  addTodo(todo: Todo) {
    this.allTodos.mutate(todos => {
      todos.push(todo)
    })
  }

  markDone(todo: Todo) {
    this.allTodos.mutate((todos) => {
      const todoToFinish = todos.find(t => t === todo);
      if (todoToFinish) {
        todoToFinish.done = true
      }
    })
  }
}

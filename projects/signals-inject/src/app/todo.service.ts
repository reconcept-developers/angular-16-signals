import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";


export interface Todo {
  label: string;
  done: boolean;
}

@Injectable()
export class TodoService {

  private allTodos = new BehaviorSubject<Todo[]>([])
  allTodos$ = this.allTodos.asObservable(); // only expose observable for encapsulations

  // use pipe & map to show selections of the todos
  todos = this.allTodos$.pipe(map(todos => todos.filter(todo => !todo.done)))
  doneTodos = this.allTodos$.pipe(map(todos => todos.filter(todo => todo.done)))

  addTodo(todo: Todo) {
    const currentTodos = this.allTodos.getValue();
    this.allTodos.next([...currentTodos, todo])
  }

  markDone(todo: Todo) {
    const currentTodos = this.allTodos.getValue();

    // we need extra code to get the 'right' object from the list, to mark that as done
    this.updateInCurrent(todo, currentTodos, true);
    this.allTodos.next(currentTodos);
  }

  markUndone(todo: Todo) {
    const currentTodos = this.allTodos.getValue();

    // we need extra code to get the 'right' object from the list, to mark that as undone
    this.updateInCurrent(todo, currentTodos, false);
    this.allTodos.next(currentTodos);
  }

  private updateInCurrent(todo: Todo, currentTodos: Todo[], done: boolean) {
    const todoInCurrent = currentTodos.find(t => t.label === todo.label);
    if (todoInCurrent) {
      todoInCurrent.done = done
    }
  }
}

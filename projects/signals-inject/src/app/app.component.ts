import { Component } from '@angular/core';
import { Todo, TodoSignal } from "./todo.signal";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodoSignal],
  imports: [
    FormsModule,
    CommonModule
  ],
  standalone: true
})
export class AppComponent {
  title = 'signals-inject';

  newTodo!: string;

  todos: Todo[] = []
  doneTodos: Todo[] = []

  constructor() {
  }

  addTodo() {
    this.newTodo = '';
  }

  markDone(todo: Todo) {
    todo.done = true;

    this.todos = this.todos.filter(todo => !todo.done)
    this.doneTodos.push(todo)
  }

  markUndone(todo: Todo) {
    todo.done = false;

    this.doneTodos = this.doneTodos.filter(todo => todo.done)
    this.todos.push(todo)
  }
}

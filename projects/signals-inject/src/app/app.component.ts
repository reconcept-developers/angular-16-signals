import { Component, effect, inject } from '@angular/core';
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

  todoSignal = inject(TodoSignal)
  newTodo!: string;

  constructor() {
    effect(() => {
      // what to do here?
    })
  }

  addTodo() {
    this.todoSignal.addTodo({
      label: this.newTodo,
      done: false
    })

    this.newTodo = '';
  }

  markDone(todo: Todo) {
    this.todoSignal.markDone(todo);
  }
}

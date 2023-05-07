import { Component, inject } from '@angular/core';
import { Todo, TodoSignal } from "./todo.signal";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TodoService } from "./todo.service";
import { Subject, takeUntil } from "rxjs";

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

  todoService = inject(TodoService);

  private destroyed$ = new Subject<void>();

  constructor() {
    this.todoService.todos.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (todos) => this.todos = todos
    })

    this.todoService.doneTodos.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (todos) => this.doneTodos = todos
    })
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  addTodo() {
    this.todoService.addTodo({
      label: this.newTodo,
      done: false
    })
    this.newTodo = '';
  }

  markDone(todo: Todo) {
    this.todoService.markDone(todo)
  }

  markUndone(todo: Todo) {
    this.todoService.markUndone(todo)
  }
}

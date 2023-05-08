import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Todo, TodoService } from "./todo.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodoService],
  imports: [
    FormsModule,
    CommonModule
  ],
  standalone: true
})
export class AppComponent implements OnDestroy {
  newTodo!: string;

  todos: Todo[] = []
  doneTodos: Todo[] = []

  todoService = inject(TodoService);

  private destroyed$ = new Subject<void>();

  constructor() {
    // we need to unsubscribe, when the component is removed
    this.todoService.todos.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (todos) => this.todos = todos
    })

    // we need to unsubscribe, when the component is removed
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

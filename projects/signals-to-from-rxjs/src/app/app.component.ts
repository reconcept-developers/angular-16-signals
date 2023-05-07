import { Component, inject, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    FormsModule,
    CommonModule
  ],
  standalone: true
})
export class AppComponent {
  http = inject(HttpClient)

  shipQuery = signal('')
  results = signal([])

  ship!: string;

  constructor() {
  }


  find() {
  }
}

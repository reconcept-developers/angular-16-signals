import { Component, inject, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { map } from "rxjs";

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

  getShips(ship: string) {
    const query = `?search=${ship}`
    return this.http.get(`https://swapi.dev/api/starships/${query}`).pipe(
      map((response: any) => response.results as any[])
    )
  }
}

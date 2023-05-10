import { Component, inject, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { map, Observable } from "rxjs";

interface SwShip {
  name: string;
}

@Component({
  selector: 'app-root',
  template: `
    <main>
      <h1>Signals RxJS</h1>

      <h2>Find a star wars ship</h2>
      <input [(ngModel)]="ship"/>
      <button (click)="find()">Find</button>

      <h2> Results </h2>
      <div *ngFor="let result of results">
        {{ result.name }}
      </div>

    </main>
  `,
  styleUrls: ['./app.component.scss'],
  imports: [
    FormsModule,
    CommonModule
  ],
  standalone: true
})
export class AppComponent {
  http = inject(HttpClient)

  results: SwShip[] = []

  ship!: string;
  shipQuery = signal('')


  ngOnInit() {
    this.getShips('').subscribe({
      next: (results) => {
        this.results = results;
      }
    })
  }

  find() {
    this.getShips('').subscribe({
      next: (results) => {
        this.results = results;
      }
    })
  }

  getShips(ship: string): Observable<SwShip[]> {
    const query = `?search=${ship}`
    return this.http.get(`https://swapi.dev/api/starships/${query}`).pipe(
      map((response: any) => response.results as any[])
    )
  }
}

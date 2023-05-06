import { Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, switchMap } from "rxjs";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
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
  title = 'signals-rxjs';

  http = inject(HttpClient)

  shipQuery = signal('')
  results = toSignal(
    toObservable(this.shipQuery,).pipe( // needs to be here, for injection context
      switchMap((ship) => {
        const query = `?search=${ship}`
        return this.http.get(`https://swapi.dev/api/starships/${query}`).pipe(
          map((response: any) => response.results)
        )
      }),
      // startWith([])
    ),
    {
      initialValue: []
    }
  )

  ship!: string;

  constructor() {
  }

  hasNoResults = computed(() => {
    return !this.results().length
  })

  find() {
    this.shipQuery.set(this.ship)
  }
}

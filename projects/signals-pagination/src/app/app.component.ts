import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BehaviorSubject, combineLatest, distinctUntilChanged, map } from "rxjs";

const users = [
  {id: 1, name: 'Spiderman'},
  {id: 2, name: 'Hulk'},
  {id: 3, name: 'Wolverine'},
  {id: 4, name: 'Cyclops'},
  {id: 5, name: 'Venom'},
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main>
      <h1>Pagination</h1>
      <input [ngModel]="searchInput$ | async" (ngModelChange)="searchUser($event)" placeholder="Search">

      <ul>
        <li *ngFor="let user of paginatedAndFilteredUsers$ | async">{{ user.name }}</li>
      </ul>

      <div class="controls">
        <button (click)="goToPrevPage()">Previous</button>
        <span>pag. {{ currentPage$ | async }}</span>
        <button (click)="goToNextPage()">Next</button>
      </div>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly firstPage = 1;

  itemsPerPage = 2;

  searchInput$ = new BehaviorSubject('');
  currentPage$ = new BehaviorSubject(this.firstPage);

  paginatedAndFilteredUsers$ = combineLatest([
    this.currentPage$.pipe(distinctUntilChanged()), // trigger only when it actually changes
    this.searchInput$.pipe(
      distinctUntilChanged(),
      map((searchText) =>
        users.filter((user) =>
          user.name.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    ),
  ]).pipe(
    map(([currentPage, filteredUsers]) => {
      const startIndex = (currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return filteredUsers.slice(startIndex, endIndex);
    })
  );

  searchUser(searchText: string): void {
    this.searchInput$.next(searchText);
    if (this.currentPage$.value > this.firstPage) {
      this.currentPage$.next(this.firstPage);
    }
  }

  goToPrevPage(): void {
    this.currentPage$.next(Math.max(this.currentPage$.value - 1, 1));
  }

  goToNextPage(): void {
    this.currentPage$.next(
      Math.min(this.currentPage$.value + 1, this.itemsPerPage + 1)
    );
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  total: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  addToParent($event: number) {
    this.total += $event;
  }
}

import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true
})
export class AppComponent {
  title = 'signals-basic';

  counter = signal(0)
  double = computed(() => {
    console.log('running computed');
    return this.counter() * 2;
  })

  constructor() {
    effect(() => {
      console.log('running effect');
      console.log(`Counter value: ${this.counter()}`)
    })
  }

  increment() {
    this.counter.update(c => c + 1)
  }

  decrement() {
    this.counter.update(c => c - 1)
  }

  reset() {
    this.counter.set(0)
  }
}

import { Component, computed, effect, Injector, signal } from '@angular/core';

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

  constructor(private injector: Injector) {
    effect(() => {
      console.log('outer effect');

      // const double = this.double();
      // console.log(double);

      effect(() => {
        this.counter();

        this.counter.set(3);


        console.log('inner effect')
      }, {
        injector: this.injector,
        allowSignalWrites: true
      })
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

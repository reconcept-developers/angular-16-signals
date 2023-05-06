import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { Grapevine } from "./grapevine";

@Component({
  selector: 'normal-cd',
  template: `
    <h3>Normal CD</h3>
    <div>{{ myNumber() }}</div>

    <div>
      <button (click)="tellParent.emit()">Update self</button>
    </div>
  `,
  standalone: true
})
export class NormalCdComponent {
  @Input() parentNumber = 0;
  @Output() tellParent = new EventEmitter<number>();

  grapevine = inject(Grapevine)

  myNumber() {
    return Math.floor(Math.random() * 10)
  }
}

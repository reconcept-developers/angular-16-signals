import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { Grapevine } from "./grapevine";

@Component({
  selector: 'on-push',
  template: `
    <h3>On Push</h3>
    <div>{{ myNumber() }}</div>


    <div>
      <button (click)="tellParent.emit()">Update self</button>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushComponent {
  @Input() parentNumber: number = 0;
  @Output() tellParent = new EventEmitter<number>();

  grapevine = inject(Grapevine)

  updateParent() {
    this.tellParent.emit(Math.floor(Math.random() * 10))
  }

  myNumber() {
    return Math.floor(Math.random() * 10)
  }
}

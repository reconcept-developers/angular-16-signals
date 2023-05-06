import { scan, Subject } from "rxjs";
import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Grapevine {
  sharedNumber: number = 0;

  sharedSub = new Subject<number>()
  shared$ = this.sharedSub.asObservable().pipe(scan((a, b) => a + b))

  sharedSignal = signal(0)

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NormalCdComponent } from "./normal-cd.component";
import { OnPushComponent } from "./on-push.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NormalCdComponent,
    OnPushComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

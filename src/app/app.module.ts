import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Imports
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Modules
import { SharedModule } from './shared/shared.module';
// Routings
import { AppRoutingModule } from './app-routing.module';
// Components
import { AppComponent } from './app.component';
import { ToastsComponent } from '@shared/standalones/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({}, {}),
    NgbModule,
    ToastsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

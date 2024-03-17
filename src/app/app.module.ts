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
// Store
import { movieReducer } from '@core/store/movies/movies.reducer';
import { favoritesReducer } from '@core/store/favorites/favorites.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({ movies: movieReducer, favorites: favoritesReducer}, {}),
    NgbModule,
    ToastsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

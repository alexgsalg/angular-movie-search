import { Component, inject } from '@angular/core';
import { IMovie } from '@core/models/movies.model';
import { removeFavorite, addFavorite } from '@core/store/favorites/favorites.actions';
import { selectFavorites } from '@core/store/favorites/favorites.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  isFavorited = false;

  // Injects
  store$ = inject(Store)

  // Store
  allFavorites$: Observable<IMovie[]> = this.store$.select(selectFavorites);

  toggleFavorite(movie: IMovie): void {
    if (!movie) return;
    this.validateFavoriteMovie(movie?.imdbID);

    if (this.isFavorited) {
      this.store$.dispatch(removeFavorite({id: movie?.imdbID}));
    } else {
      this.store$.dispatch(addFavorite({payload: movie}));
    }
  }

  private validateFavoriteMovie(id: string): boolean {
    this.allFavorites$.subscribe((state) => {
      console.log('this.allFavorites$.subscribe > state:', state);
      this.isFavorited = state.some((m) => m.imdbID === id)
    })
    return false;
  }
}

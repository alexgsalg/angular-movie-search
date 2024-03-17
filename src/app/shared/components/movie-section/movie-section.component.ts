import { Component, Input, SimpleChanges, inject } from '@angular/core';
// models
import { IMovie } from '@core/models/movies.model';
// store
import { addFavorite, removeFavorite } from '@core/store/favorites/favorites.actions';
import { selectFavorites } from '@core/store/favorites/favorites.selectors';
// imports
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-section',
  templateUrl: './movie-section.component.html',
  styleUrls: ['./movie-section.component.scss'],
})
export class MovieSectionComponent {
  @Input() movie: IMovie | undefined;
  @Input() isLoading: boolean = false;

  showMore: boolean = false;
  isFavorited: boolean = false;
  rating: number | undefined = undefined;

  // Injects
  store$ = inject(Store)

  // Store
  allFavorites$: Observable<IMovie[]> = this.store$.select(selectFavorites);

  ngOnChanges(changes: SimpleChanges):void {
    if(changes.isLoading?.previousValue !== changes.isLoading?.currentValue ) {
      this.rating =(Number(changes.movie?.currentValue?.imdbRating || 0) / 2) || undefined;

      if (this.movie) this.validateFavoriteMovie(this.movie?.imdbID);
    }
  }

  toggleFavorite(): void {
    if (!this.movie) return;

    if (this.isFavorited) {
      this.store$.dispatch(removeFavorite({id: this.movie?.imdbID}));
    } else {
      this.store$.dispatch(addFavorite({payload: this.movie}));
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

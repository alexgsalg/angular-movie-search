import { Component, inject } from '@angular/core';
// services
import { MoviesService } from '@core/services/movies.service';
import { ToastService } from '@shared/standalones/toast/toast.service';
import { Store } from '@ngrx/store';
// models
import { IMovie, MovieSuggestion } from '@core/models/movies.model';
// store
import { selectMovies } from '@core/store/movies/movies.selectors';
// imports
import { Observable, finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  movieSearched: IMovie | undefined;
  movieHistory: IMovie[] = [];
  loadingMovie: boolean = false;

  // Injects
  toastService$ = inject(ToastService);
  moviesService$ = inject(MoviesService);
  store$ = inject(Store);

  // Store
  allMovies$: Observable<IMovie[]> = this.store$.select(selectMovies);

  ngOnInit(): void {}

  onFetchMovie(movie: MovieSuggestion) {
    if (!movie) {
      this.toastService$.error('Movie not found');
      return;
    }

    this.loadingMovie = true;
    this.moviesService$.fetchMovie(movie.Title, movie.imdbID).pipe(
      finalize(() => this.loadingMovie = false),
      ).subscribe({
        next: (res) => {
          this.movieSearched = res;
        }
      })
  }
}

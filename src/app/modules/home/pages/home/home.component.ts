import { Component, inject } from '@angular/core';
// services
import { MoviesService } from '@core/services/movies.service';
import { ToastService } from '@shared/standalones/toast/toast.service';
// models
import { IMovie, MovieSuggestion } from '@core/models/movies.model';
import { finalize } from 'rxjs';
// imports

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  movieSearched: IMovie | undefined;
  loadingMovie: boolean = false;

  // Injects
  toastService$ = inject(ToastService);
  moviesService$ = inject(MoviesService);

  onFetchMovie(movie: MovieSuggestion) {
    console.log('onFetchMovie > movieSelected:', movie);
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

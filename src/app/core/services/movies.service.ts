import { MovieState } from './../store/movies/movies.reducer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie, IMovieSuggestion, MovieSuggestion } from '@core/models/movies.model';
import { Observable, map, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from './../../../envonments/environment';
import { addMovie } from '@core/store/movies/movies.actions';
import { selectMovies } from '@core/store/movies/movies.selectors';
import { AppState } from '@core/store/app.store';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl = environment.api.endpoint;

  allMovies$: Observable<MovieState> = this.store.select((store)=> store.movies)

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  searchMoviesSuggestions(term: string) : Observable<MovieSuggestion[]> {
    return this.http.get<IMovieSuggestion>(`${this.baseUrl}s=${term}`).pipe(
      map((res)=> res.Search as MovieSuggestion[]),
    )
  }

  fetchMovie(title: string, id: string) : Observable<IMovie> {
    // look first on the store
    const movieStored: IMovie | undefined = this.returnMovieIfStored(id)
    if (movieStored) {
      return of(movieStored);
    }
    // if not exist then fetch from api
    return this.http.get<IMovie>(`${this.baseUrl}&plot=full&t=${title}`).pipe(
      tap((res)=> this.store.dispatch(
        addMovie({ payload: res })
        )
      ),
    )
  }

  returnMovieIfStored(id: string): IMovie | undefined {
    let movieStored: IMovie | undefined;
    this.allMovies$.subscribe((state) => {
      if (!state.movies.length) return;
      movieStored = state.movies.find((m) => m.imdbID === id)
    })
    return movieStored;
  }
}

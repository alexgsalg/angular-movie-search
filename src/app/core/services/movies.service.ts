import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMovie, IMovieSuggestion, MovieSuggestion } from '@core/models/movies.model';
import { Observable, map, tap } from 'rxjs';
import { environment } from './../../../envonments/environment';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl = environment.api.endpoint;

  constructor(private http: HttpClient) { }

  searchMoviesSuggestions(term: string) : Observable<MovieSuggestion[]> {
    return this.http.get<IMovieSuggestion>(`${this.baseUrl}s=${term}`).pipe(
      map((res)=> res.Search as MovieSuggestion[]),
    )
  }

  fetchMovie(title: string, id?: string) : Observable<IMovie> {
    // look first on the store

    // if not exist then fetch from api
    return this.http.get<IMovie>(`${this.baseUrl}&plot=full&t=${title}`).pipe(
      // tap((res)=> res.Search as MovieSuggestion),
    )
  }
}

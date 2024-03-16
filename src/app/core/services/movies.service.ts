import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMovieSearch, MovieSearch } from '@core/models/movies.model';
import { Observable, map, tap } from 'rxjs';
import { environment } from './../../../envonments/environment';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl = environment.api.endpoint;

  constructor(private http: HttpClient) { }

  searchMoviesByTerm(term: string) : Observable<MovieSearch[]> {
    return this.http.get<IMovieSearch>(`${this.baseUrl}s=${term}`).pipe(
      map((res)=> res.Search as MovieSearch[]),
    )
  }

  fetchMovie(title: string, id?: string) : Observable<MovieSearch[]> {
    // look first on the store

    // if not exist then fetch from api
    return this.http.get<IMovieSearch>(`${this.baseUrl}&plot=full&t=${title}`).pipe(
      map((res)=> res.Search as MovieSearch[]),
    )
  }
}

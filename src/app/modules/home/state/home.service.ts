import { Injectable } from "@angular/core";
import { IMovie } from "@core/models/movies.model";

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  private storageInitiated = false;

  constructor() {}

  getMovies(): IMovie[] {
    if (!this.storageInitiated) localStorage.setItem('movies', '');

    return JSON.parse(localStorage.getItem('movies') || '[]');
  }

  saveMovies(movies: IMovie[]) {
    if (!this.storageInitiated) localStorage.setItem('movies', '');

    localStorage.setItem('movies', JSON.stringify(movies));
  }

}

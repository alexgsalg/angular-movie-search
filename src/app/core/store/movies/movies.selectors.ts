import { createSelector } from "@ngrx/store";
import { AppState } from './../app.store';
import { MovieState } from './movies.reducer';

export const selectAllMovies = (state: AppState) => state.movies;

export const selectMovies = createSelector(
  selectAllMovies,
  (state: MovieState) => state?.movies
  );

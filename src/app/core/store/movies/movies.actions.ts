import { createAction, props } from "@ngrx/store";
import { IMovie } from '@core/models/movies.model';

export const addMovie = createAction(
  '[Movies] Add Movie',
  props<{payload: IMovie}>()
  );

export const resetMovies = createAction('[Movies] Reset Movies');

export const loadMovies = createAction('[Movies] Load Movies');
export const loadMoviesFailure = createAction(
  '[Movies] Load Movies Failure',
  props<{ error: string }>()
  );
export const loadMoviesSuccess = createAction(
  '[Movies] Load Movies Success',
  props<{ movies: IMovie[] }>()
);

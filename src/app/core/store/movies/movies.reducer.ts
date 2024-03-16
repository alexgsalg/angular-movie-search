import { createReducer, on } from '@ngrx/store';
import { IMovie } from '../../models/movies.model';
import { addMovie, loadMovies, loadMoviesFailure, loadMoviesSuccess, resetMovies } from './movies.actions';
import { StoreStatus } from '@models/store.model';

export interface MovieState {
  movies: IMovie[];
  error: string | null;
  status: StoreStatus;
}

export const initialState: MovieState = {
  movies: [],
  error: null,
  status: StoreStatus.Pending,
}

export const movieReducer = createReducer(
  initialState,
  // ADD MOVIE
  on(addMovie, (state, { payload }) => ({
    ...state,
    movies: [...state.movies, payload]
  })),
  // RESET MOVIE
  on(resetMovies, (state) => ({
    ...state,
    movies: []
  })),

  // LOADING
  on(loadMovies, (state) => ({...state, status: StoreStatus.Loading })),

  on(loadMoviesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StoreStatus.Error
  })),

  on(loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies: movies,
    error: null,
    status: StoreStatus.Success
  })),
  );

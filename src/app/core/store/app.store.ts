import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { MovieState, movieReducer } from './movies/movies.reducer';
import { FavoritesState, favoritesReducer } from './favorites/favorites.reducer';
import { hydrationMetaReducer } from './hydration/hydration.reducer';

export interface AppState {
  movies: MovieState;
  favorites: FavoritesState;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: movieReducer,
  favorites: favoritesReducer
}

export const metaReducers: MetaReducer[] = [
  hydrationMetaReducer
]

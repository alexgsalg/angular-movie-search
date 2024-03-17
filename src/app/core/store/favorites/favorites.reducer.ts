import { createReducer, on } from '@ngrx/store';
import { IMovie } from '../../models/movies.model';
import { addFavorite, removeFavorite, resetFavorite  } from './favorites.actions';
import { StoreStatus } from '@models/store.model';

export interface FavoritesState {
  favorites: IMovie[];
  error: string | null;
  status: StoreStatus;
}

export const initialState: FavoritesState = {
  favorites: [],
  error: null,
  status: StoreStatus.Pending,
}

export const favoritesReducer = createReducer(
  initialState,
  // ADD FAVORITES
  on(addFavorite, (state, { payload }) => ({
    ...state,
    favorites: [...state.favorites, payload]
  })),
  // REMOVE FAVORITES
  on(removeFavorite, (state, { id }) => ({
    ...state,
    favorites: state.favorites.filter((favorite) => favorite.imdbID !== id),
  })),
  // RESET FAVORITES
  on(resetFavorite, (state) => ({
    ...state,
    favorites: []
  })),
  );

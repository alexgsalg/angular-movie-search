import { createSelector } from "@ngrx/store";
import { AppState } from './../app.store';
import { FavoritesState } from './favorites.reducer';

export const selectAllFavorites = (state: AppState) => state.favorites;

export const selectFavorites = createSelector(
  selectAllFavorites,
  (state: FavoritesState) => state?.favorites
  );

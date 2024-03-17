import { createAction, props } from "@ngrx/store";
import { IMovie } from '@core/models/movies.model';

export const addFavorite = createAction(
  '[Movies] Add Favorite',
  props<{ payload: IMovie }>()
  );

export const removeFavorite = createAction(
  '[Movies] Remove Favorite',
  props<{ id: string }>()
  );

export const resetFavorite = createAction('[Movies] Reset Favorite');

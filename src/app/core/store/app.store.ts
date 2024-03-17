import { MovieState } from './movies/movies.reducer';
import { FavoritesState } from './favorites/favorites.reducer';

export interface AppState {
  movies: MovieState;
  favorites: FavoritesState;
}

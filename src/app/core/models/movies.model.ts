export interface IMovie {
  Title: string;
  Year: string;
  Rated: string;
  Releases: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRating[];
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  Response: string;
}

export interface MovieRating {
  Source: string;
  Value: string;
}

export interface IMovieSuggestion {
  Search: MovieSuggestion[];
}

export interface MovieSuggestion {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}


//

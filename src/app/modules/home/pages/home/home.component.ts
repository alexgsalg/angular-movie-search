import { Component } from '@angular/core';
import { MovieSearch } from '@core/models/movies.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  movieToSearch: MovieSearch | undefined;

}

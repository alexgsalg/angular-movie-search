import { Component, Input, SimpleChanges } from '@angular/core';
// models
import { IMovie } from '@core/models/movies.model';

@Component({
  selector: 'app-movie-section',
  templateUrl: './movie-section.component.html',
  styleUrls: ['./movie-section.component.scss'],
})
export class MovieSectionComponent {
  @Input() movie: IMovie | undefined;
  @Input() isLoading: boolean = false;

  showMore: boolean = false;
  rating: number | undefined = undefined;

  ngOnChanges(changes: SimpleChanges):void {
    if(changes.isLoading?.previousValue !== changes.isLoading?.currentValue ) {
      this.rating =(Number(changes.movie?.currentValue?.imdbRating || 0) / 2) || undefined;
    }
  }
}

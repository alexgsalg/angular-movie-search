import { Component, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [NgbRatingConfig],
})
export class RatingComponent {
  @Input() rating: number = 0;
  @Input() max: number = 5;
  @Input() readonly: boolean = false;
  @Input() colorVar: string = '--bs-yellow';

  constructor(private config: NgbRatingConfig) {
		config.max = this.max;
	}

  ngOnInit(): void {
    this.config.max = this.max;
    this.config.readonly = this.readonly;
  }

  handleStarFill(fill: number): string {
    if (fill <= 10 ) return '-outline';
    if (fill === 100 ) return '';
    return '-half';
  }

}

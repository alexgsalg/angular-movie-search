import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, finalize } from 'rxjs';
// services
import { MoviesService } from '@core/services/movies.service';
// models
import { MovieSearch } from '@core/models/movies.model';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss']
})
export class SearchSectionComponent {
  @Output() onSelect: EventEmitter<MovieSearch> = new EventEmitter();

  form: FormGroup;
  inputFocused: boolean = false;
  suggestions: MovieSearch[] = [];
  suggestionLoading: boolean = false;

  formSub$: Subscription | undefined;

  constructor(private fb: FormBuilder, private moviesService: MoviesService) {
    this.form = this.fb.group({
      title: ['']
    })
  }

  ngOnInit(): void {

    this.onTitleInput();
  }

  onTitleInput() {
    this.formSub$ = this.form.get('title')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((value) => {
        this.suggestionLoading = true;

        this.moviesService.searchMoviesByTerm(value)
          .pipe(finalize(() => this.suggestionLoading = false),)
          .subscribe({
          next: (res) => this.suggestions = res,
          error: (err) => console.log(err)
        })
      })
      // TODO: add toast
  }

  nhOnDestroy(): void {
    this.formSub$?.unsubscribe()
  }
}

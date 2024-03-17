import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  finalize,
} from 'rxjs';
// services
import { MoviesService } from '@core/services/movies.service';
// models
import { MovieSuggestion } from '@core/models/movies.model';
import { ToastService } from '@shared/standalones/toast/toast.service';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss'],
})
export class SearchSectionComponent {
  @ViewChild('suggestionList') suggestionList: ElementRef | undefined;

  @Output() onSelect: EventEmitter<MovieSuggestion> = new EventEmitter();

  form: FormGroup;
  inputFocused: boolean = false;
  suggestions: MovieSuggestion[] = [];
  suggestionSelected: MovieSuggestion | undefined;
  suggestionLoading: boolean = false;

  formSub$: Subscription | undefined;

  // Injects
  toastService$ = inject(ToastService);
  moviesService$ = inject(MoviesService);
  fb$ = inject(FormBuilder);

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(this.suggestionList?.nativeElement.contains(event.target)) {
      this.inputFocused = true;
    } else {
      this.inputFocused = false;
    }
  }

  constructor() {
    this.form = this.fb$.group({
      title: [''],
    });
  }

  ngOnInit(): void {
    this.onTitleInput();
  }

  onTitleInput() {
    this.formSub$ = this.form
      .get('title')
      ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.suggestionLoading = true;

        this.fetchSuggestions(value);
      });
  }

  fetchSuggestions(term: string) {
    this.moviesService$
    .searchMoviesSuggestions(term)
    .pipe(finalize(() => (this.suggestionLoading = false)))
    .subscribe({
      next: (res) => (this.suggestions = res),
      error: (err) => {
        this.toastService$.show({ message: `Unable to fetch suggestions: ${err}`, classname: 'bg-danger text-light', delay: 15000 })
      },
    });
  }

  onSuggestionsSelect(suggestion: MovieSuggestion): void {
    this.suggestionSelected = suggestion;
    this.form.patchValue( { title: suggestion.Title })
    this.inputFocused = false;
  }

  onSearch() {
    if (!this.form.value.title) return;
    this.onSelect.emit(this.form.value.title)
  }

  onReset(): void {
    this.form.reset();
    this.suggestions= [];
  }

  nhOnDestroy(): void {
    this.formSub$?.unsubscribe();
  }
}

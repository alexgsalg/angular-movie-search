import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
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
  @Input() isLoading: boolean = false;
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
    this.suggestions = [];
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
    this.onSelect.emit(this.suggestionSelected)
  }

  onReset(): void {
    this.form.reset();
    this.suggestions= [];
  }

  linkIndex = 0;
  startIndex: number = 0;

  navigateUsingKey(ev: KeyboardEvent) {
    if (!this.inputFocused) return;

    switch (ev.key ) {
      case 'ArrowUp':
        this.linkIndex === -1 ? this.linkIndex = 0 : this.linkIndex-- ;
      break;

      case 'ArrowDown':
        this.linkIndex === this.suggestions.length ?  this.suggestions.length : this.linkIndex++ ;
      break;

      case 'Enter':
        this.selectSuggestionOnEnter();
      break;

      case 'Escape':
        this.inputFocused = false;
      break;
    }
  }

  selectSuggestionOnEnter(){
    this.suggestionSelected = this.suggestions[this.linkIndex];
    this.form.patchValue( { title: this.suggestions[this.linkIndex].Title });
    this.inputFocused = false;
  }

  ngOnDestroy(): void {
    this.formSub$?.unsubscribe();
  }
}

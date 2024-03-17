import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// Imports
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
// Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/button/button.component';
import { RatingComponent } from './components/rating/rating.component';
import { FieldInputComponent } from './components/field-input/field-input.component';
import { MovieSectionComponent } from './components/movie-section/movie-section.component';
// Pipes
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    RatingComponent,
    FieldInputComponent,
    MovieSectionComponent,
    // Pipes
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbRatingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    RatingComponent,
    FieldInputComponent,
    MovieSectionComponent,
    // Pipes
    TruncatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}

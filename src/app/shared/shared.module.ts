import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/button/button.component';
import { RatingComponent } from './components/rating/rating.component';
import { FieldInputComponent } from './components/field-input/field-input.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, ButtonComponent,RatingComponent, FieldInputComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports: [HeaderComponent, FooterComponent, ButtonComponent,RatingComponent, FieldInputComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }

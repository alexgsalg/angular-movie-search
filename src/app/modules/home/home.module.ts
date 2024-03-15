import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SearchSectionComponent } from './components/search-section/search-section.component';
import { MovieSectionComponent } from './components/movie-section/movie-section.component';


@NgModule({
  declarations: [
    HomeComponent,
    SearchSectionComponent,
    MovieSectionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }

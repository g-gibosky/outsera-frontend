import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleWinnersComponent } from './multiple-winners/multiple-winners.component';
import { TopStudiosComponent } from './top-studios/top-studios.component';
import { ProducersIntervalComponent } from './producers-interval/producers-interval.component';
import { MovieSearchComponent } from './get-movies/get-movies.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MultipleWinnersComponent,
    TopStudiosComponent,
    ProducersIntervalComponent,
    MovieSearchComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}

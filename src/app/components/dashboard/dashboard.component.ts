import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MovieService } from '../../services/movie.service';
import { ProducerWinIntervalResponse, StudioWithWins, YearsWithMultipleWinnersResponse, YearWithMultipleWinners } from '../../models/api.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    HttpClientModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  multipleWinners: YearWithMultipleWinners[] = [];
  topStudios: StudioWithWins[] = [];
  producersMaxMin: ProducerWinIntervalResponse = {
    max: [],
    min: [],
  };

  multipleWinnersColumns: string[] = ['year', 'winCount'];
  studiosColumns: string[] = ['name', 'winCount'];
  producersColumns: string[] = [
    'producer',
    'interval',
    'previousYear',
    'followingYear',
  ];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getYearsWithMultipleWinners().subscribe((data) => {
      this.multipleWinners = data.years;
    });

    this.movieService.getStudiosWithWinCount().subscribe((data) => {
      this.topStudios = data.studios;
    });

    this.movieService
      .getProducersWinIntervals()
      .subscribe((data: ProducerWinIntervalResponse) => {
        this.producersMaxMin.max = [data['min'][0]];
        this.producersMaxMin.min = [data['max'][0]];
      });
  }
}

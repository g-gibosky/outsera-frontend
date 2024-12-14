import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MovieService } from '../../../services/movie.service';
import { ProducerWinInterval } from '../../../models/api.interface';

@Component({
  selector: 'app-producers-interval',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatTabsModule],
  templateUrl: 'producers-interval.component.html',
  styleUrl: 'producers-interval.component.scss',
})
export class ProducersIntervalComponent implements OnInit {
  maxData: ProducerWinInterval[] = [];
  minData: ProducerWinInterval[] = [];
  displayedColumns: string[] = [
    'producer',
    'interval',
    'previousWin',
    'followingWin',
  ];
  columnNames: { [key: string]: string } = {
    producer: 'Producer',
    interval: 'Interval',
    previousWin: 'Previous Win',
    followingWin: 'Following Win',
  };

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getProducersWinIntervals().subscribe((response) => {
      this.maxData = response.max;
      this.minData = response.min;
    });
  }
}

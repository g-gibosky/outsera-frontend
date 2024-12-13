// src/app/components/dashboard/multiple-winners/multiple-winners.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MovieService } from '../../../services/movie.service';
import { YearWithMultipleWinners } from '../../../models/api.interface';

@Component({
  selector: 'app-multiple-winners',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: "./multiple-winners.component.html",
  styleUrl: "./multiple-winners.component.scss",
})
export class MultipleWinnersComponent implements OnInit {
  data: YearWithMultipleWinners[] = [];
  displayedColumns: string[] = ['year', 'winnerCount'];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getYearsWithMultipleWinners().subscribe((response) => {
      this.data = response.years;
    });
  }
}

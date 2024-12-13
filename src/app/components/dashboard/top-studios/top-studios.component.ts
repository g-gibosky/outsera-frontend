// src/app/components/dashboard/top-studios/top-studios.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MovieService } from '../../../services/movie.service';
import { StudioWithWins } from '../../../models/api.interface';

@Component({
  selector: 'app-top-studios',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: 'top-studios.component.html',
  styleUrl: 'top-studios.component.scss',
})
export class TopStudiosComponent implements OnInit {
  data: StudioWithWins[] = [];
  displayedColumns: string[] = ['name', 'winCount'];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getStudiosWithWinCount().subscribe((response) => {
      this.data = response.studios.slice(0,3);
    });
  }
}

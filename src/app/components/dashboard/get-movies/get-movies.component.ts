import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MovieService } from '../../../services/movie.service';
import { Movie, PageResponse } from '../../../models/api.interface';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './get-movies.component.html',
  styleUrl: './get-movies.component.scss',
})
export class MovieSearchComponent implements OnInit {
  displayedColumns: string[] = ['id', 'year', 'title', 'studios', 'winner'];
  dataSource: Movie[] = [];
  searchYear: number | null = null;
  hasSearched = false;

  // Pagination
  currentPage = 0;
  pageSize = 5;
  totalElements = 0;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  searchMovies() {
    this.currentPage = 0;
    this.loadMovies();
  }

  loadMovies() {
    this.hasSearched = true;
    this.movieService
      .getMovies(
        this.currentPage,
        this.pageSize,
        undefined,
        this.searchYear || undefined
      )
      .subscribe((response: PageResponse<Movie>) => {
        this.dataSource = response.content;
        this.totalElements = response.totalElements;
      });
  }

  handlePageEvent(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadMovies();
  }
}
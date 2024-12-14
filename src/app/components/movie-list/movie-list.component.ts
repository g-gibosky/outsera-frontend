import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MovieService } from '../../services/movie.service';
import { MatSelectModule } from '@angular/material/select'; 
import { Movie, PageResponse } from '../../models/api.interface';

@Component({
  selector: 'app-movie-list',
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
    MatSelectModule,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'year', 'title', 'studios', 'winners'];
  dataSource: MatTableDataSource<Movie, MatPaginator> | undefined;
  searchYear: string | null = null;
  winner_type: boolean | undefined;
  isLoading = true;

  // Pagination
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private movieService: MovieService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService
      .getMovies(0, 1)
      .subscribe((response: PageResponse<Movie>) => {
        this.totalElements = response.totalElements;
        this.loadAllMovies();
      });
  }

  loadAllMovies() {
    this.isLoading = true;
    this.movieService.getMovies(0, this.totalElements).subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.content);
      this.setupFilter();
      this.dataSource!.paginator = this.paginator;
      this.isLoading = false;
    });
  }

  setupFilter() {
    this.dataSource!.filterPredicate = (data: Movie) => {
      const yearMatch =
        this.searchYear === '' ||
        data.year.toString().includes(this.searchYear!);
      const winnerMatch =
        this.winner_type === undefined || data.winner === this.winner_type;
      return yearMatch && winnerMatch;
    };
    this.applyFilters();
  }

  handlePageEvent(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  applyYearFilter(event: Event) {
    this.searchYear = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = this.searchYear || '';
    this.applyFilters();
  }

  private applyFilters() {
    setTimeout(() => {
      this.dataSource!.paginator = this.paginator;
      if (this.dataSource!.paginator) {
        this.dataSource!.paginator.firstPage();
      }
    });
  }

  filterWinners() {
    this.applyFilters();
  }
}
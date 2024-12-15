import { Component, ViewChild, ViewEncapsulation, AfterViewInit, OnInit } from '@angular/core';
import {
  Overlay,
  OverlayContainer,
  FlexibleConnectedPositionStrategy,
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MovieService } from '../../services/movie.service';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { Movie, PageResponse } from '../../models/api.interface';
import { ViewportRuler, ScrollingModule } from '@angular/cdk/scrolling';

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
    ScrollingModule,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MovieListComponent implements OnInit, AfterViewInit {
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
  @ViewChild('winnerSelect') select!: MatSelect;

  constructor(
    private movieService: MovieService,
    private platform: Platform,
    private overlay: Overlay
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  ngAfterViewInit() {
    if (this.platform.isBrowser) {
      this.select.openedChange.subscribe((opened) => {
        if (opened) {
          const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.select._elementRef)
            .withPositions([
              {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: 8,
              },
            ]);

          const overlayRef = this.overlay.create({
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            width: this.select._elementRef.nativeElement.offsetWidth,
          });

          this.select.openedChange.subscribe((isOpen) => {
            if (!isOpen) {
              overlayRef.dispose();
            }
          });
        }
      });
    }
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
      this.applyFilters();
      this.isLoading = false;
    });
  }

  setupFilter() {
    this.dataSource!.filterPredicate = (data: Movie, filter: string) => {
      const yearMatch =
        this.searchYear === null ||
        data.year.toString().includes(this.searchYear!);
      const winnerMatch =
        this.winner_type === undefined || data.winner === this.winner_type;
      return yearMatch && winnerMatch;
    };
  }

  handlePageEvent(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  applyYearFilter(event: Event) {
    this.searchYear = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  private applyFilters() {
    this.dataSource!.filter = Date.now().toString();
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

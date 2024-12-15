import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../services/movie.service';
import { BehaviorSubject, of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {
  Movie,
  PageResponse,
  Pageable,
} from '../../models/api.interface';

describe('MovieListComponent Integration', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  const mockPageable: Pageable = {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    unpaged: false,
    paged: true,
  };

  const mockMovies: PageResponse<Movie> = {
    content: [
      {
        id: 1,
        year: 1980,
        title: "Can't Stop the Music",
        studios: ['Associated Film'],
        producers: ['Allan Carr'],
        winner: true,
      },
      {
        id: 2,
        year: 1980,
        title: 'Cruising',
        studios: ['Lorimar'],
        producers: ['Jerry Weintraub'],
        winner: false,
      },
    ],
    pageable: mockPageable,
    last: true,
    totalElements: 2,
    totalPages: 1,
    size: 10,
    number: 0,
    sort: {
      sorted: false,
      unsorted: true,
    },
    first: true,
    numberOfElements: 2,
  };

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovies']);
    movieServiceSpy.getMovies.and.returnValue(of(mockMovies));

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MovieListComponent,
      ],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    fixture.detectChanges();
  });

  // Add new pagination-specific tests
  it('should handle first page correctly', () => {
    expect(component.dataSource?.data).toEqual(mockMovies.content);
    expect(mockMovies.first).toBeTrue();
    expect(mockMovies.number).toBe(0);
  });

  it('should handle pagination metadata correctly', () => {
    expect(mockMovies.totalElements).toBe(2);
    expect(mockMovies.totalPages).toBe(1);
    expect(mockMovies.numberOfElements).toBe(2);
  });

  it('should display loading state', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(
      By.css('.loading-container')
    );
    expect(loadingElement).toBeTruthy();
    expect(loadingElement.nativeElement.textContent).toContain(
      'Loading movies...'
    );
  });

  it('should display table when data is loaded', () => {
    component.isLoading = false;
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('should display correct column headers', () => {
    const headers = fixture.debugElement.queryAll(By.css('th'));
    expect(headers.length).toBe(5); // ID, Year, Title, Studios, Winner
    expect(headers[0].nativeElement.textContent).toContain('ID');
    expect(headers[1].nativeElement.textContent).toContain('Year');
    expect(headers[2].nativeElement.textContent).toContain('Title');
    expect(headers[3].nativeElement.textContent).toContain('Studios');
    expect(headers[4].nativeElement.textContent).toContain('Winner?');
  });

  it('should handle no data scenario', fakeAsync(() => {
    component.dataSource!.filter = '9999'; // Non-existent year
    tick(500);
    fixture.detectChanges();

    const noDataRow = fixture.debugElement.query(By.css('.mat-row'));
    expect(noDataRow).toBeTruthy();
    expect(noDataRow.nativeElement.textContent).toContain(
      'No data matching the filter criteria'
    );
  }));
});

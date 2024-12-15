import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Movie,
  PageResponse,
  Pageable,
} from '../models/api.interface';

@Injectable({
  providedIn: 'root',
})
export class MockMovieService {
  private mockMovies: Movie[] = [
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
    {
      id: 3,
      year: 1980,
      title: 'The Formula',
      studios: ['MGM', 'United Artists'],
      producers: ['Steve Shagan', 'Herbert F. Solow'],
      winner: false,
    },
  ];

  getMovies(page: number, size: number): Observable<PageResponse<Movie>> {
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedMovies = this.mockMovies.slice(startIndex, endIndex);

    const totalElements = this.mockMovies.length;
    const totalPages = Math.ceil(totalElements / size);

    const pageable: Pageable = {
      pageNumber: page,
      pageSize: size,
      sort: {
        sorted: false,
        unsorted: true,
      },
      offset: startIndex,
      unpaged: false,
      paged: true,
    };

    const response: PageResponse<Movie> = {
      content: paginatedMovies,
      pageable: pageable,
      last: page >= totalPages - 1,
      totalElements: totalElements,
      totalPages: totalPages,
      size: size,
      number: page,
      sort: {
        sorted: false,
        unsorted: true,
      },
      first: page === 0,
      numberOfElements: paginatedMovies.length,
    };

    return of(response);
  }
}

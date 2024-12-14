export interface PageableSort {
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  sort: PageableSort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface PageResponse<T> {
  content: T[];
  pageable: Pageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: PageableSort;
  number: number;
  numberOfElements: number;
  size: number;
}

export interface YearWithMultipleWinners {
  year: number;
  winnerCount: number;
}

export interface YearsWithMultipleWinnersResponse {
  years: YearWithMultipleWinners[];
}

export interface StudioWithWins {
  name: string;
  winCount: number;
}

export interface StudiosWithWinsResponse {
  studios: StudioWithWins[];
}

export interface ProducerWinInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface ProducerWinIntervalResponse {
  min: ProducerWinInterval[];
  max: ProducerWinInterval[];
}

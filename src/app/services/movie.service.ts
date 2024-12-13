import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  Movie,
  YearsWithMultipleWinnersResponse,
  StudiosWithWinsResponse,
  ProducerWinIntervalResponse,
} from '../models/api.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly API_URL = 'https://challenge.outsera.tech/api/movies';

  constructor(private http: HttpClient) {}

  getYearsWithMultipleWinners(): Observable<YearsWithMultipleWinnersResponse> {
    return this.http.get<YearsWithMultipleWinnersResponse>(
      `${this.API_URL}?projection=years-with-multiple-winners`
    );
  }

  getStudiosWithWinCount(): Observable<StudiosWithWinsResponse> {
    return this.http.get<StudiosWithWinsResponse>(
      `${this.API_URL}?projection=studios-with-win-count`
    );
  }

  getProducersWinIntervals(): Observable<ProducerWinIntervalResponse> {
    return this.http.get<ProducerWinIntervalResponse>(
      `${this.API_URL}?projection=max-min-win-interval-for-producers`
    );
  }

  getMoviesByYear(year: number, winner?: boolean): Observable<Movie> {
    let params = new HttpParams().set('year', year.toString());

    if (winner !== undefined) {
      params = params.set('winner', winner.toString());
    }

    return this.http.get<Movie>(`${this.API_URL}`, { params });
  }
}

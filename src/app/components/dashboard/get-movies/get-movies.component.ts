import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-get-movies',
  standalone: true,
  imports: [],
  templateUrl: './get-movies.component.html',
  styleUrl: './get-movies.component.scss'
})
export class GetMoviesComponent implements OnInit {
  movies: any = []

  constructor(private movieService: MovieService){

  }
  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }


}

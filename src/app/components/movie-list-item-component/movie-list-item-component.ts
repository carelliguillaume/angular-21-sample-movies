import { Component, inject, input } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-movie-list-item-component',
  imports: [],
  templateUrl: './movie-list-item-component.html',
  styleUrl: './movie-list-item-component.scss',
})
export class MovieListItemComponent {
  private readonly movieService = inject(MovieService);

  readonly movie = input.required<Movie>()

  deleteMovie(event: any) {
    console.log('3B - MovieListItemComponent - deleteMovie', event);
    this.movieService.deleteMovie(this.movie().id);
  }
}

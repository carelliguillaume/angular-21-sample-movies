import { Component, input } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list-item-component',
  imports: [],
  templateUrl: './movie-list-item-component.html',
  styleUrl: './movie-list-item-component.scss',
})
export class MovieListItemComponent {
  readonly movie = input.required<Movie>()
}

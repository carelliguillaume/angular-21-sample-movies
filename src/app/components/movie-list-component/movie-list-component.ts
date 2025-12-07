import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { MovieListItemComponent } from "../movie-list-item-component/movie-list-item-component";
import { RouterLink } from "@angular/router";
import { MovieAddComponent } from "../movie-add-component/movie-add-component";

@Component({
  selector: 'app-movie-list-component',
  imports: [MovieListItemComponent, RouterLink, MovieAddComponent],
  templateUrl: './movie-list-component.html',
  styleUrl: './movie-list-component.scss',
})
export class MovieListComponent {
  private readonly movieService = inject(MovieService);

  readonly moviesRes = rxResource({
    stream: () => {
      return this.movieService.getMovies();
    },
  });

  constructor() {
    this.moviesRes.update
  }
}

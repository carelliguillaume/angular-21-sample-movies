import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-movie-detail-component',
  imports: [],
  templateUrl: './movie-detail-component.html',
  styleUrl: './movie-detail-component.scss',
})
export class MovieDetailComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly movieService = inject(MovieService);

  movieId = toSignal(this.activatedRoute.params.pipe(map((params) => { return +params['id']})));

  movieRes = rxResource({
    params: () => { return this.movieId() },
    stream: ({params: id }) => {
      if(id) {
        return this.movieService.getMovie(id);
      }
      else {
        throw Error('Erreur de chargement du film');
      }
    },
  });


}

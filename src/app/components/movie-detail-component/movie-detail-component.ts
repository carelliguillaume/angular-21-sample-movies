import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { ActorListItemComponent } from '../actor-list-item-component/actor-list-item-component';
import { ActorAddComponent } from "../actor-add-component/actor-add-component";
import { Actor } from '../../models/actor.model';

@Component({
  selector: 'app-movie-detail-component',
  imports: [
    ActorListItemComponent,
    ActorAddComponent
],
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

  deleteActor(event: Actor): void {
    const movie = this.movieRes.value();
    if (movie) {
      movie.actors = movie.actors.filter(a => a.firstName !== event.firstName && a.lastName !== event.lastName && a.birthdate !== event.birthdate);
      this.movieService.updateMovie(movie).subscribe({
        next: () => {},
        error: () => {}
      });
    }
  }

}

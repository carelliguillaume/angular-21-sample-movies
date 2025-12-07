import { Component, inject, input, output } from '@angular/core';
import { Actor } from '../../models/actor.model';
import { AgePipe } from "../../pipes/age-pipe";
import { DatePipe } from '@angular/common';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-actor-list-item-component',
  imports: [
    DatePipe,
    AgePipe
  ],
  templateUrl: './actor-list-item-component.html',
  styleUrl: './actor-list-item-component.scss',
})
export class ActorListItemComponent {

  private readonly movieService = inject(MovieService);

  readonly actor = input.required<Actor>();
  readonly deleteActor = output<Actor>();

  deleteActorButtonClick(event: any) {
    console.log('3B - ActorListItemComponent - deleteActor', event);
    this.deleteActor.emit(this.actor());

  }
}

import { Component, input } from '@angular/core';
import { Actor } from '../../models/actor.model';
import { AgePipe } from "../../pipes/age-pipe";
import { DatePipe } from '@angular/common';

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
  readonly actor = input.required<Actor>();
}

import { Component, effect, inject, input, signal } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Actor } from '../../models/actor.model';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-actor-add-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './actor-add-component.html',
  styleUrl: './actor-add-component.scss',
})
export class ActorAddComponent {
  private readonly movieService = inject(MovieService);

  readonly movie = input.required<Movie>();

  readonly addResultMsg = signal<string>('');

  readonly addResultMsgEffect = effect(() => {
    const addResultMsgValue = this.addResultMsg();
    if(addResultMsgValue && addResultMsgValue !== '') {
      setTimeout(() => {
        this.addResultMsg.set('');
      }, 2000);
    }
  });

  actorForm = new FormGroup({
    firstName: new FormControl('FirstName', [Validators.required]),
    lastName: new FormControl('LastName', [Validators.required]),
    birthdate: new FormControl(new Date(), [Validators.required]),
  });

  onSubmit() {
    console.log('3B - MovieAddComponent - onSubmit - movieForm.value', this.actorForm.value);

    const actor: Actor = {
      firstName: this.actorForm.controls.firstName.value ?? '',
      lastName: this.actorForm.controls.lastName.value ?? '',
      birthdate: this.actorForm.controls.birthdate.value ? new Date(this.actorForm.controls.birthdate.value) : new Date(),
    };

    this.movie().actors.push(actor);
    this.movieService.updateMovie(this.movie()).subscribe({
      next: () => {
        this.addResultMsg.set('Actor ajouté avec succès');
      },
      error: () => {
        this.addResultMsg.set('Erreur lors de l\'ajout de actor');
      },
    });
  }
}

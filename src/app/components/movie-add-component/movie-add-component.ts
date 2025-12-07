import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-movie-add-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './movie-add-component.html',
  styleUrl: './movie-add-component.scss',
})
export class MovieAddComponent {
  private readonly movieService = inject(MovieService);

  readonly addResultMsg = signal<string>('');

  readonly addResultMsgEffect = effect(() => {
    const addResultMsgValue = this.addResultMsg();
    if(addResultMsgValue && addResultMsgValue !== '') {
      setTimeout(() => {
        this.addResultMsg.set('');
      }, 2000);
    }
  });

  movieForm = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    title: new FormControl('Exemple de titre', [Validators.required]),
    year: new FormControl(1900, [Validators.required]),
    synopsis: new FormControl('Exemple de synopsis', [Validators.required]),
  });
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log('3B - MovieAddComponent - onSubmit - movieForm.value', this.movieForm.value);

    const movie: Movie = {
      id: this.movieForm.controls.id.value ?? 0,
      title: this.movieForm.controls.title.value ?? '',
      year: this.movieForm.controls.year.value ?? 0,
      synopsis: this.movieForm.controls.synopsis.value ?? '',
      actors: [],
    };

    this.movieService.addMovie(movie).subscribe({
      next: () => {
        this.addResultMsg.set('Movie ajouté avec succès');
      },
      error: () => {
        this.addResultMsg.set('Erreur lors de l\'ajout de movie');
      },
    });
  }
}



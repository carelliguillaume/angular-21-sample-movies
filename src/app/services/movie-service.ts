import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private moviesList: Movie[] = [
    { id : 1,
      title: 'Dora',
      synopsis: 'Histoire de Dora',
      year: 2000,
      actors: [
        { firstName: 'Nais',
          lastName: 'Mauraud',
          birthdate: new Date('2001-12-17T00:00:00'),
        },
        { firstName: 'Victor',
          lastName: 'Mauraud',
          birthdate: new Date('1995-12-17T00:00:00'),
        },
      ],
    },
    { id : 2,
      title: 'Batman',
      synopsis: 'Histoire de Batman',
      year: 1995,
      actors: [
        { firstName: 'Bruce',
          lastName: 'Wayne',
          birthdate: new Date('1980-12-17T00:00:00'),
        },
        { firstName: 'Cat',
          lastName: 'Woman',
          birthdate: new Date('1983-12-17T00:00:00'),
        },
      ],
    },
    { id : 3,
      title: 'Jurassic Park',
      synopsis: 'Histoire de Jurassic Park',
      year: 1995,
      actors: [
        { firstName: 'John',
          lastName: 'Hammond',
          birthdate: new Date('1970-12-17T00:00:00'),
        },
        { firstName: 'Sarah',
          lastName: 'Arding',
          birthdate: new Date('1975-12-17T00:00:00'),
        },
      ],
    },
    { id : 4,
      title: 'Jack Reacher',
      synopsis: 'Histoire de Jack Reacher',
      year: 2020,
      actors: [
        { firstName: 'Tom',
          lastName: 'Cruise',
          birthdate: new Date('1970-12-17T00:00:00'),
        },
        { firstName: 'Bruce',
          lastName: 'Willys',
          birthdate: new Date('1975-12-17T00:00:00'),
        },
      ],
    },
  ]

  getMovies(): Observable<Movie[]> {
    return of(this.moviesList).pipe(delay(3000));
  }

  getMovie(id: number): Observable<Movie | undefined> {
    return of(this.moviesList.find((m) => m.id === id)).pipe(delay(3000));
  }
}

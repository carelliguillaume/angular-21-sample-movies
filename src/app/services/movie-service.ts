import { effect, Injectable } from '@angular/core';
import { delay, Observable, of, ReplaySubject, switchMap } from 'rxjs';
import { Movie } from '../models/movie.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private readonly MOVIES_STORAGE_KEY = 'movies_storage_key';
  private moviesList$ = new ReplaySubject<Movie[]>(1);


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

  constructor() {
    const moviesFromStorage = this.loadMoviesFromStorage();
    if (moviesFromStorage) {
      this.moviesList = moviesFromStorage;
    }
    this.moviesList$.next(this.moviesList);

    const moviesListSignal = toSignal(this.moviesList$.asObservable(), { initialValue: [] });

    const moviesListEffect = effect(() => {
      const moviesList = moviesListSignal();
      console.log('3B - MovieService - moviesListEffect', moviesList);
      if (moviesList) {
        this.saveMoviesInStorage(moviesList);
      }
    });
  }



  dateISORegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/; // format ISO UTC de toISOString()

  parseWithDates<T>(json: string): T {
    return JSON.parse(json, (_key, value) => {
      // Ne touche qu'aux strings qui ressemblent à une date ISO
      if (typeof value === 'string' && this.dateISORegex.test(value)) {
        const d = new Date(value);
        return isNaN(d.getTime()) ? value : d; // sécurité si invalide
      }
      return value;
    });
  }



  loadMoviesFromStorage(): Movie[] | undefined {
    let moviesFromStorage: Movie[] | undefined;
    const moviesJsonValue = window.localStorage.getItem(this.MOVIES_STORAGE_KEY);
    if (moviesJsonValue) {
      const movies = this.parseWithDates<Movie[]>(moviesJsonValue);
      return moviesFromStorage = movies;
    }
    return moviesFromStorage;
  }

  saveMoviesInStorage(movies: Movie[]): void {
    const moviesJsonValue = JSON.stringify(movies);
    window.localStorage.setItem(this.MOVIES_STORAGE_KEY, moviesJsonValue);
  }


  getMovies(): Observable<Movie[]> {
    return this.moviesList$.asObservable().pipe(delay(3000));
  }

  getMovie(id: number): Observable<Movie | undefined> {
    return this.moviesList$.asObservable().pipe(switchMap((movies) => {
      const movie = movies.find((m) => {
        return m.id === id;
      });
      return of(movie);
    }), delay(3000));
  }

  addMovie(movie: Movie): Observable<void> {
    const lastExistingId = Math.max(...this.moviesList.map(m => m.id));
    movie.id = lastExistingId + 1;
    this.moviesList.push(movie);
    this.moviesList = [...this.moviesList];
    this.moviesList$.next(this.moviesList);
    return of(void 0);
  }

  deleteMovie(id: number): Observable<void> {
    this.moviesList = this.moviesList.filter(m => m.id !== id);
    this.moviesList$.next(this.moviesList);
    return of(void 0);
  }

  updateMovie(movieUpdated: Movie): Observable<void> {
    this.moviesList = this.moviesList.filter(m => m.id !== movieUpdated.id);
    this.moviesList.push(movieUpdated);
    this.moviesList = this.moviesList.sort((a, b) => a.id - b.id);
    this.moviesList$.next(this.moviesList);
    return of(void 0);
  }
}

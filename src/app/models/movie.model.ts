import { Actor } from "./actor.model";

export interface Movie {
  id: number,
  title: string,
  year: number,
  synopsis: string,
  actors: Actor[],
}

import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'movies_searched',
})
export class MovieSearch extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Title: string;
  @property({
    type: 'string',
    required: true,
  })
  Year: string;
  @property({
    type: 'string',
    required: true,
  })
  imdbID: string;
  @property({
    type: 'string',
    required: true,
  })
  Type: string;
  @property({
    type: 'string',
    required: true,
  })
  Poster: string;

  constructor(data?: Partial<MovieSearch>) {
    super(data);
  }
}

export interface MovieSearchRelations {
  // describe navigational properties here
}

export type MovieSearchWithRelations = MovieSearch & MovieSearchRelations;

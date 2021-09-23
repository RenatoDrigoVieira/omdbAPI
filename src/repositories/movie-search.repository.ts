import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {MovieSearch, MovieSearchRelations} from '../models';

export class MovieSearchRepository extends DefaultCrudRepository<
  MovieSearch,
  typeof MovieSearch.prototype.id,
  MovieSearchRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MovieSearch, dataSource);
  }
}

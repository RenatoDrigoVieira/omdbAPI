import {inject} from '@loopback/context';
import {Filter} from '@loopback/filter';
import {FilterExcludingWhere, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {MovieSearch} from '../models';
import {MovieSearchRepository} from '../repositories';
import {OmdbExternalApiService} from '../services';

export class OmdbController {
  constructor(
    @inject('services.OmdbExternalApiService')
    protected omdbExternalApiService: OmdbExternalApiService,
    @repository(MovieSearchRepository)
    public movieSearchRepository: MovieSearchRepository,
  ) {}

  @get('/history')
  @response(200, {
    description: 'Array of MovieSearch model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MovieSearch, {includeRelations: true}),
        },
      },
    },
  })
  async getSearchHistory(
    @param.filter(MovieSearch) filter?: Filter<MovieSearch>,
  ): Promise<MovieSearch[]> {
    return this.movieSearchRepository.find(filter);
  }

  @get('/query')
  @response(200, {
    description: 'MovieSearch model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MovieSearch, {includeRelations: true}),
      },
    },
  })
  async searchByName(
    @param.query.string('name') name: string,
    @param.filter(MovieSearch, {exclude: 'where'})
    filter?: FilterExcludingWhere<MovieSearch>,
  ): Promise<any> {
    const response = await this.omdbExternalApiService.searchByTitleName(name);

    for (let movie of response.Search) {
      await this.movieSearchRepository.create(movie);
    }
    return response;
  }

  // @post('/movie-searches')
  // @response(200, {
  //   description: 'MovieSearch model instance',
  //   content: {'application/json': {schema: getModelSchemaRef(MovieSearch)}},
  // })
  // async create(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(MovieSearch, {
  //           title: 'NewMovieSearch',
  //           exclude: ['id'],
  //         }),
  //       },
  //     },
  //   })
  //   movieSearch: Omit<MovieSearch, 'id'>,
  // ): Promise<MovieSearch> {
  //   return this.movieSearchRepository.create(movieSearch);
  // }

  // @get('/movie-searches/count')
  // @response(200, {
  //   description: 'MovieSearch model count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async count(
  //   @param.where(MovieSearch) where?: Where<MovieSearch>,
  // ): Promise<Count> {
  //   return this.movieSearchRepository.count(where);
  // }

  // @patch('/movie-searches')
  // @response(200, {
  //   description: 'MovieSearch PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(MovieSearch, {partial: true}),
  //       },
  //     },
  //   })
  //   movieSearch: MovieSearch,
  //   @param.where(MovieSearch) where?: Where<MovieSearch>,
  // ): Promise<Count> {
  //   return this.movieSearchRepository.updateAll(movieSearch, where);
  // }

  // @patch('/movie-searches/{id}')
  // @response(204, {
  //   description: 'MovieSearch PATCH success',
  // })
  // async updateById(
  //   @param.path.number('id') id: number,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(MovieSearch, {partial: true}),
  //       },
  //     },
  //   })
  //   movieSearch: MovieSearch,
  // ): Promise<void> {
  //   await this.movieSearchRepository.updateById(id, movieSearch);
  // }

  // @put('/movie-searches/{id}')
  // @response(204, {
  //   description: 'MovieSearch PUT success',
  // })
  // async replaceById(
  //   @param.path.number('id') id: number,
  //   @requestBody() movieSearch: MovieSearch,
  // ): Promise<void> {
  //   await this.movieSearchRepository.replaceById(id, movieSearch);
  // }

  // @del('/movie-searches/{id}')
  // @response(204, {
  //   description: 'MovieSearch DELETE success',
  // })
  // async deleteById(@param.path.number('id') id: number): Promise<void> {
  //   await this.movieSearchRepository.deleteById(id);
  // }
}

import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'dsOmdb',
  connector: 'rest',
  baseURL: 'http://www.omdbapi.com/?apiKey=9fce8334&',
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'http://www.omdbapi.com/?apiKey=9fce8334&s={titleName}&type=movie',
      },
      functions: {
        searchByTitleName: ['titleName'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DsOmdbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'dsOmdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.dsOmdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

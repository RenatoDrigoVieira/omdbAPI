import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {DsOmdbDataSource} from '../datasources';

interface OmdbSearch {
  Search: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }[];
  totalResults: number;
  Response: boolean;
}

export interface OmdbExternalApiService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  searchByTitleName(titleName: string): Promise<OmdbSearch>;
}

export class OmdbExternalApiServiceProvider
  implements Provider<OmdbExternalApiService>
{
  constructor(
    // dsOmdb must match the name property in the datasource json file
    @inject('datasources.dsOmdb')
    protected dataSource: DsOmdbDataSource = new DsOmdbDataSource(),
  ) {}

  value(): Promise<OmdbExternalApiService> {
    return getService(this.dataSource);
  }
}

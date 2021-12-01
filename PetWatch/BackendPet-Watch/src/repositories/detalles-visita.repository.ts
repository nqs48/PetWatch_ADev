import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetallesVisita, DetallesVisitaRelations} from '../models';

export class DetallesVisitaRepository extends DefaultCrudRepository<
  DetallesVisita,
  typeof DetallesVisita.prototype.idDetallesVisita,
  DetallesVisitaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(DetallesVisita, dataSource);
  }
}

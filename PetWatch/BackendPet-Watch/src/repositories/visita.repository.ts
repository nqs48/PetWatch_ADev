import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Visita, VisitaRelations} from '../models';

export class VisitaRepository extends DefaultCrudRepository<
  Visita,
  typeof Visita.prototype.idVisita,
  VisitaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Visita, dataSource);
  }
}

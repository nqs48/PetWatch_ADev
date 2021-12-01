import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PagoPlanes, PagoPlanesRelations} from '../models';

export class PagoPlanesRepository extends DefaultCrudRepository<
  PagoPlanes,
  typeof PagoPlanes.prototype.idPago,
  PagoPlanesRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PagoPlanes, dataSource);
  }
}

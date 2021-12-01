import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetallesPedidoP, DetallesPedidoPRelations} from '../models';

export class DetallesPedidoPRepository extends DefaultCrudRepository<
  DetallesPedidoP,
  typeof DetallesPedidoP.prototype.idDetallesPedidoP,
  DetallesPedidoPRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(DetallesPedidoP, dataSource);
  }
}

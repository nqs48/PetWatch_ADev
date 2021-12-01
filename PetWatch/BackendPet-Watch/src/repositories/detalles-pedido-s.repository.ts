import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetallesPedidoS, DetallesPedidoSRelations} from '../models';

export class DetallesPedidoSRepository extends DefaultCrudRepository<
  DetallesPedidoS,
  typeof DetallesPedidoS.prototype.idDetallesPedidoS,
  DetallesPedidoSRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(DetallesPedidoS, dataSource);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PedidoServicio, PedidoServicioRelations, Cliente, Servicio, DetallesPedidoS} from '../models';
import {ClienteRepository} from './cliente.repository';
import {DetallesPedidoSRepository} from './detalles-pedido-s.repository';
import {ServicioRepository} from './servicio.repository';

export class PedidoServicioRepository extends DefaultCrudRepository<
  PedidoServicio,
  typeof PedidoServicio.prototype.idPedidoS,
  PedidoServicioRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof PedidoServicio.prototype.idPedidoS>;

  public readonly servicios: HasManyThroughRepositoryFactory<Servicio, typeof Servicio.prototype.idServicio,
          DetallesPedidoS,
          typeof PedidoServicio.prototype.idPedidoS
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('DetallesPedidoSRepository') protected detallesPedidoSRepositoryGetter: Getter<DetallesPedidoSRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(PedidoServicio, dataSource);
    this.servicios = this.createHasManyThroughRepositoryFactoryFor('servicios', servicioRepositoryGetter, detallesPedidoSRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}

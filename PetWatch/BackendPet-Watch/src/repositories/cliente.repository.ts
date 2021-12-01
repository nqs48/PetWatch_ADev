import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, PedidoProducto, PedidoServicio, Mascota, Solicitud} from '../models';
import {PedidoProductoRepository} from './pedido-producto.repository';
import {PedidoServicioRepository} from './pedido-servicio.repository';
import {MascotaRepository} from './mascota.repository';
import {SolicitudRepository} from './solicitud.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.idCliente,
  ClienteRelations
> {

  public readonly pedidoProductos: HasManyRepositoryFactory<PedidoProducto, typeof Cliente.prototype.idCliente>;

  public readonly pedidoServicios: HasManyRepositoryFactory<PedidoServicio, typeof Cliente.prototype.idCliente>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Cliente.prototype.idCliente>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Cliente.prototype.idCliente>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidoProductoRepository') protected pedidoProductoRepositoryGetter: Getter<PedidoProductoRepository>, @repository.getter('PedidoServicioRepository') protected pedidoServicioRepositoryGetter: Getter<PedidoServicioRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Cliente, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.pedidoServicios = this.createHasManyRepositoryFactoryFor('pedidoServicios', pedidoServicioRepositoryGetter,);
    this.registerInclusionResolver('pedidoServicios', this.pedidoServicios.inclusionResolver);
    this.pedidoProductos = this.createHasManyRepositoryFactoryFor('pedidoProductos', pedidoProductoRepositoryGetter,);
    this.registerInclusionResolver('pedidoProductos', this.pedidoProductos.inclusionResolver);
  }
}

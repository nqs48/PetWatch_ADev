import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, Proveedor, Servicio, PedidoProducto, DetallesPedidoP} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {ServicioRepository} from './servicio.repository';
import {DetallesPedidoPRepository} from './detalles-pedido-p.repository';
import {PedidoProductoRepository} from './pedido-producto.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.idProducto,
  ProductoRelations
> {

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Producto.prototype.idProducto>;

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof Producto.prototype.idProducto>;

  public readonly pedidoProductos: HasManyThroughRepositoryFactory<PedidoProducto, typeof PedidoProducto.prototype.idPedidoP,
          DetallesPedidoP,
          typeof Producto.prototype.idProducto
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('DetallesPedidoPRepository') protected detallesPedidoPRepositoryGetter: Getter<DetallesPedidoPRepository>, @repository.getter('PedidoProductoRepository') protected pedidoProductoRepositoryGetter: Getter<PedidoProductoRepository>,
  ) {
    super(Producto, dataSource);
    this.pedidoProductos = this.createHasManyThroughRepositoryFactoryFor('pedidoProductos', pedidoProductoRepositoryGetter, detallesPedidoPRepositoryGetter,);
    this.registerInclusionResolver('pedidoProductos', this.pedidoProductos.inclusionResolver);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PedidoProducto, PedidoProductoRelations, Cliente, Producto, DetallesPedidoP} from '../models';
import {ClienteRepository} from './cliente.repository';
import {DetallesPedidoPRepository} from './detalles-pedido-p.repository';
import {ProductoRepository} from './producto.repository';

export class PedidoProductoRepository extends DefaultCrudRepository<
  PedidoProducto,
  typeof PedidoProducto.prototype.idPedidoP,
  PedidoProductoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof PedidoProducto.prototype.idPedidoP>;

  public readonly productos: HasManyThroughRepositoryFactory<Producto, typeof Producto.prototype.idProducto,
          DetallesPedidoP,
          typeof PedidoProducto.prototype.idPedidoP
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('DetallesPedidoPRepository') protected detallesPedidoPRepositoryGetter: Getter<DetallesPedidoPRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(PedidoProducto, dataSource);
    this.productos = this.createHasManyThroughRepositoryFactoryFor('productos', productoRepositoryGetter, detallesPedidoPRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}

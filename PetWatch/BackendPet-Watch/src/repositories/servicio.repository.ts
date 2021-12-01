import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Servicio, ServicioRelations, Proveedor, PedidoServicio, DetallesPedidoS, Cliente, Funcionario} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {DetallesPedidoSRepository} from './detalles-pedido-s.repository';
import {PedidoServicioRepository} from './pedido-servicio.repository';
import {ClienteRepository} from './cliente.repository';
import {FuncionarioRepository} from './funcionario.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.idServicio,
  ServicioRelations
> {

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Servicio.prototype.idServicio>;

  public readonly pedidoServicios: HasManyThroughRepositoryFactory<PedidoServicio, typeof PedidoServicio.prototype.idPedidoS,
          DetallesPedidoS,
          typeof Servicio.prototype.idServicio
        >;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Servicio.prototype.idServicio>;

  public readonly funcionario: BelongsToAccessor<Funcionario, typeof Servicio.prototype.idServicio>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('DetallesPedidoSRepository') protected detallesPedidoSRepositoryGetter: Getter<DetallesPedidoSRepository>, @repository.getter('PedidoServicioRepository') protected pedidoServicioRepositoryGetter: Getter<PedidoServicioRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('FuncionarioRepository') protected funcionarioRepositoryGetter: Getter<FuncionarioRepository>,
  ) {
    super(Servicio, dataSource);
    this.funcionario = this.createBelongsToAccessorFor('funcionario', funcionarioRepositoryGetter,);
    this.registerInclusionResolver('funcionario', this.funcionario.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.pedidoServicios = this.createHasManyThroughRepositoryFactoryFor('pedidoServicios', pedidoServicioRepositoryGetter, detallesPedidoSRepositoryGetter,);
    this.registerInclusionResolver('pedidoServicios', this.pedidoServicios.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
  }
}

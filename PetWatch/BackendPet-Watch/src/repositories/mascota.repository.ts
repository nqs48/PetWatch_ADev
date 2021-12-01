import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, Plan, PagoPlanes, Funcionario, Visita, Solicitud} from '../models';
import {ClienteRepository} from './cliente.repository';
import {PagoPlanesRepository} from './pago-planes.repository';
import {PlanRepository} from './plan.repository';
import {VisitaRepository} from './visita.repository';
import {FuncionarioRepository} from './funcionario.repository';
import {SolicitudRepository} from './solicitud.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.idMascota,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.idMascota>;

  public readonly planes: HasManyThroughRepositoryFactory<Plan, typeof Plan.prototype.idPlan,
          PagoPlanes,
          typeof Mascota.prototype.idMascota
        >;

  public readonly funcionarios: HasManyThroughRepositoryFactory<Funcionario, typeof Funcionario.prototype.idFuncionario,
          Visita,
          typeof Mascota.prototype.idMascota
        >;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Mascota.prototype.idMascota>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('PagoPlanesRepository') protected pagoPlanesRepositoryGetter: Getter<PagoPlanesRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('VisitaRepository') protected visitaRepositoryGetter: Getter<VisitaRepository>, @repository.getter('FuncionarioRepository') protected funcionarioRepositoryGetter: Getter<FuncionarioRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Mascota, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.funcionarios = this.createHasManyThroughRepositoryFactoryFor('funcionarios', funcionarioRepositoryGetter, visitaRepositoryGetter,);
    this.registerInclusionResolver('funcionarios', this.funcionarios.inclusionResolver);
    this.planes = this.createHasManyThroughRepositoryFactoryFor('planes', planRepositoryGetter, pagoPlanesRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}

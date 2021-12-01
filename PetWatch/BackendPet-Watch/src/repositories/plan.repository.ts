import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plan, PlanRelations, Mascota, PagoPlanes} from '../models';
import {PagoPlanesRepository} from './pago-planes.repository';
import {MascotaRepository} from './mascota.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.idPlan,
  PlanRelations
> {

  public readonly mascotas: HasManyThroughRepositoryFactory<Mascota, typeof Mascota.prototype.idMascota,
          PagoPlanes,
          typeof Plan.prototype.idPlan
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PagoPlanesRepository') protected pagoPlanesRepositoryGetter: Getter<PagoPlanesRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Plan, dataSource);
    this.mascotas = this.createHasManyThroughRepositoryFactoryFor('mascotas', mascotaRepositoryGetter, pagoPlanesRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Funcionario, FuncionarioRelations, Mascota, Visita, Solicitud} from '../models';
import {VisitaRepository} from './visita.repository';
import {MascotaRepository} from './mascota.repository';
import {SolicitudRepository} from './solicitud.repository';

export class FuncionarioRepository extends DefaultCrudRepository<
  Funcionario,
  typeof Funcionario.prototype.idFuncionario,
  FuncionarioRelations
> {

  public readonly mascotas: HasManyThroughRepositoryFactory<Mascota, typeof Mascota.prototype.idMascota,
          Visita,
          typeof Funcionario.prototype.idFuncionario
        >;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Funcionario.prototype.idFuncionario>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VisitaRepository') protected visitaRepositoryGetter: Getter<VisitaRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Funcionario, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.mascotas = this.createHasManyThroughRepositoryFactoryFor('mascotas', mascotaRepositoryGetter, visitaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}

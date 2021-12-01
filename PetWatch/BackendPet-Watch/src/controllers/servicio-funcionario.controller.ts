import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Servicio,
  Funcionario,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioFuncionarioController {
  constructor(
    @repository(ServicioRepository)
    public servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/funcionario', {
    responses: {
      '200': {
        description: 'Funcionario belonging to Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Funcionario)},
          },
        },
      },
    },
  })
  async getFuncionario(
    @param.path.string('id') id: typeof Servicio.prototype.idServicio,
  ): Promise<Funcionario> {
    return this.servicioRepository.funcionario(id);
  }
}

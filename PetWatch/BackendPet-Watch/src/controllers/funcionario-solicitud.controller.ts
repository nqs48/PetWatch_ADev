import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Funcionario,
  Solicitud,
} from '../models';
import {FuncionarioRepository} from '../repositories';

export class FuncionarioSolicitudController {
  constructor(
    @repository(FuncionarioRepository) protected funcionarioRepository: FuncionarioRepository,
  ) { }

  @get('/funcionarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Funcionario has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.funcionarioRepository.solicitudes(id).find(filter);
  }

  @post('/funcionarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Funcionario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Funcionario.prototype.idFuncionario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInFuncionario',
            exclude: ['idSolicitud'],
            optional: ['funcionarioId']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'idSolicitud'>,
  ): Promise<Solicitud> {
    return this.funcionarioRepository.solicitudes(id).create(solicitud);
  }

  @patch('/funcionarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Funcionario.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.funcionarioRepository.solicitudes(id).patch(solicitud, where);
  }

  @del('/funcionarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Funcionario.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.funcionarioRepository.solicitudes(id).delete(where);
  }
}

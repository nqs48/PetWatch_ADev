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
Mascota,
Visita,
Funcionario,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaFuncionarioController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/funcionarios', {
    responses: {
      '200': {
        description: 'Array of Mascota has many Funcionario through Visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Funcionario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Funcionario>,
  ): Promise<Funcionario[]> {
    return this.mascotaRepository.funcionarios(id).find(filter);
  }

  @post('/mascotas/{id}/funcionarios', {
    responses: {
      '200': {
        description: 'create a Funcionario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Funcionario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.idMascota,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Funcionario, {
            title: 'NewFuncionarioInMascota',
            exclude: ['idFuncionario'],
          }),
        },
      },
    }) funcionario: Omit<Funcionario, 'idFuncionario'>,
  ): Promise<Funcionario> {
    return this.mascotaRepository.funcionarios(id).create(funcionario);
  }

  @patch('/mascotas/{id}/funcionarios', {
    responses: {
      '200': {
        description: 'Mascota.Funcionario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Funcionario, {partial: true}),
        },
      },
    })
    funcionario: Partial<Funcionario>,
    @param.query.object('where', getWhereSchemaFor(Funcionario)) where?: Where<Funcionario>,
  ): Promise<Count> {
    return this.mascotaRepository.funcionarios(id).patch(funcionario, where);
  }

  @del('/mascotas/{id}/funcionarios', {
    responses: {
      '200': {
        description: 'Mascota.Funcionario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Funcionario)) where?: Where<Funcionario>,
  ): Promise<Count> {
    return this.mascotaRepository.funcionarios(id).delete(where);
  }
}

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
Visita,
Mascota,
} from '../models';
import {FuncionarioRepository} from '../repositories';

export class FuncionarioMascotaController {
  constructor(
    @repository(FuncionarioRepository) protected funcionarioRepository: FuncionarioRepository,
  ) { }

  @get('/funcionarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of Funcionario has many Mascota through Visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascota>,
  ): Promise<Mascota[]> {
    return this.funcionarioRepository.mascotas(id).find(filter);
  }

  @post('/funcionarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'create a Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Funcionario.prototype.idFuncionario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInFuncionario',
            exclude: ['idMascota'],
          }),
        },
      },
    }) mascota: Omit<Mascota, 'idMascota'>,
  ): Promise<Mascota> {
    return this.funcionarioRepository.mascotas(id).create(mascota);
  }

  @patch('/funcionarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Funcionario.Mascota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {partial: true}),
        },
      },
    })
    mascota: Partial<Mascota>,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.funcionarioRepository.mascotas(id).patch(mascota, where);
  }

  @del('/funcionarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Funcionario.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.funcionarioRepository.mascotas(id).delete(where);
  }
}

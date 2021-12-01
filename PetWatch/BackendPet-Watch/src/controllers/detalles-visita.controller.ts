import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {DetallesVisita} from '../models';
import {DetallesVisitaRepository} from '../repositories';

export class DetallesVisitaController {
  constructor(
    @repository(DetallesVisitaRepository)
    public detallesVisitaRepository : DetallesVisitaRepository,
  ) {}

  @post('/detalles-visitas')
  @response(200, {
    description: 'DetallesVisita model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetallesVisita)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesVisita, {
            title: 'NewDetallesVisita',
            exclude: ['idDetallesVisita'],
          }),
        },
      },
    })
    detallesVisita: Omit<DetallesVisita, 'idDetallesVisita'>,
  ): Promise<DetallesVisita> {
    return this.detallesVisitaRepository.create(detallesVisita);
  }

  @get('/detalles-visitas/count')
  @response(200, {
    description: 'DetallesVisita model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetallesVisita) where?: Where<DetallesVisita>,
  ): Promise<Count> {
    return this.detallesVisitaRepository.count(where);
  }

  @get('/detalles-visitas')
  @response(200, {
    description: 'Array of DetallesVisita model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetallesVisita, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetallesVisita) filter?: Filter<DetallesVisita>,
  ): Promise<DetallesVisita[]> {
    return this.detallesVisitaRepository.find(filter);
  }

  @patch('/detalles-visitas')
  @response(200, {
    description: 'DetallesVisita PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesVisita, {partial: true}),
        },
      },
    })
    detallesVisita: DetallesVisita,
    @param.where(DetallesVisita) where?: Where<DetallesVisita>,
  ): Promise<Count> {
    return this.detallesVisitaRepository.updateAll(detallesVisita, where);
  }

  @get('/detalles-visitas/{id}')
  @response(200, {
    description: 'DetallesVisita model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetallesVisita, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetallesVisita, {exclude: 'where'}) filter?: FilterExcludingWhere<DetallesVisita>
  ): Promise<DetallesVisita> {
    return this.detallesVisitaRepository.findById(id, filter);
  }

  @patch('/detalles-visitas/{id}')
  @response(204, {
    description: 'DetallesVisita PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesVisita, {partial: true}),
        },
      },
    })
    detallesVisita: DetallesVisita,
  ): Promise<void> {
    await this.detallesVisitaRepository.updateById(id, detallesVisita);
  }

  @put('/detalles-visitas/{id}')
  @response(204, {
    description: 'DetallesVisita PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detallesVisita: DetallesVisita,
  ): Promise<void> {
    await this.detallesVisitaRepository.replaceById(id, detallesVisita);
  }

  @del('/detalles-visitas/{id}')
  @response(204, {
    description: 'DetallesVisita DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detallesVisitaRepository.deleteById(id);
  }
}

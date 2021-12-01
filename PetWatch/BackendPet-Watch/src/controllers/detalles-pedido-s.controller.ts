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
import {DetallesPedidoS} from '../models';
import {DetallesPedidoSRepository} from '../repositories';

export class DetallesPedidoSController {
  constructor(
    @repository(DetallesPedidoSRepository)
    public detallesPedidoSRepository : DetallesPedidoSRepository,
  ) {}

  @post('/detalles-pedidos-s')
  @response(200, {
    description: 'DetallesPedidoS model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetallesPedidoS)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPedidoS, {
            title: 'NewDetallesPedidoS',
            exclude: ['idDetallesPedidoS'],
          }),
        },
      },
    })
    detallesPedidoS: Omit<DetallesPedidoS, 'idDetallesPedidoS'>,
  ): Promise<DetallesPedidoS> {
    return this.detallesPedidoSRepository.create(detallesPedidoS);
  }

  @get('/detalles-pedidos-s/count')
  @response(200, {
    description: 'DetallesPedidoS model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetallesPedidoS) where?: Where<DetallesPedidoS>,
  ): Promise<Count> {
    return this.detallesPedidoSRepository.count(where);
  }

  @get('/detalles-pedidos-s')
  @response(200, {
    description: 'Array of DetallesPedidoS model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetallesPedidoS, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetallesPedidoS) filter?: Filter<DetallesPedidoS>,
  ): Promise<DetallesPedidoS[]> {
    return this.detallesPedidoSRepository.find(filter);
  }

  @patch('/detalles-pedidos-s')
  @response(200, {
    description: 'DetallesPedidoS PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPedidoS, {partial: true}),
        },
      },
    })
    detallesPedidoS: DetallesPedidoS,
    @param.where(DetallesPedidoS) where?: Where<DetallesPedidoS>,
  ): Promise<Count> {
    return this.detallesPedidoSRepository.updateAll(detallesPedidoS, where);
  }

  @get('/detalles-pedidos-s/{id}')
  @response(200, {
    description: 'DetallesPedidoS model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetallesPedidoS, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetallesPedidoS, {exclude: 'where'}) filter?: FilterExcludingWhere<DetallesPedidoS>
  ): Promise<DetallesPedidoS> {
    return this.detallesPedidoSRepository.findById(id, filter);
  }

  @patch('/detalles-pedidos-s/{id}')
  @response(204, {
    description: 'DetallesPedidoS PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPedidoS, {partial: true}),
        },
      },
    })
    detallesPedidoS: DetallesPedidoS,
  ): Promise<void> {
    await this.detallesPedidoSRepository.updateById(id, detallesPedidoS);
  }

  @put('/detalles-pedidos-s/{id}')
  @response(204, {
    description: 'DetallesPedidoS PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detallesPedidoS: DetallesPedidoS,
  ): Promise<void> {
    await this.detallesPedidoSRepository.replaceById(id, detallesPedidoS);
  }

  @del('/detalles-pedidos-s/{id}')
  @response(204, {
    description: 'DetallesPedidoS DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detallesPedidoSRepository.deleteById(id);
  }
}

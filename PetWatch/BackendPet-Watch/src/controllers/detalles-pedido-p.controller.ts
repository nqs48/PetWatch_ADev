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
import {DetallesPedidoP} from '../models';
import {DetallesPedidoPRepository} from '../repositories';

export class DetallesPedidoPController {
  constructor(
    @repository(DetallesPedidoPRepository)
    public detallesPedidoPRepository : DetallesPedidoPRepository,
  ) {}

  @post('/detalles-pedidos-p')
  @response(200, {
    description: 'DetallesPedidoP model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetallesPedidoP)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPedidoP, {
            title: 'NewDetallesPedidoP',
            exclude: ['idDetallesPedidoP'],
          }),
        },
      },
    })
    detallesPedidoP: Omit<DetallesPedidoP, 'idDetallesPedidoP'>,
  ): Promise<DetallesPedidoP> {
    return this.detallesPedidoPRepository.create(detallesPedidoP);
  }

  @get('/detalles-pedidos-p/count')
  @response(200, {
    description: 'DetallesPedidoP model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetallesPedidoP) where?: Where<DetallesPedidoP>,
  ): Promise<Count> {
    return this.detallesPedidoPRepository.count(where);
  }

  @get('/detalles-pedidos-p')
  @response(200, {
    description: 'Array of DetallesPedidoP model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetallesPedidoP, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetallesPedidoP) filter?: Filter<DetallesPedidoP>,
  ): Promise<DetallesPedidoP[]> {
    return this.detallesPedidoPRepository.find(filter);
  }

  @patch('/detalles-pedidos-p')
  @response(200, {
    description: 'DetallesPedidoP PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPedidoP, {partial: true}),
        },
      },
    })
    detallesPedidoP: DetallesPedidoP,
    @param.where(DetallesPedidoP) where?: Where<DetallesPedidoP>,
  ): Promise<Count> {
    return this.detallesPedidoPRepository.updateAll(detallesPedidoP, where);
  }

  @get('/detalles-pedidos-p/{id}')
  @response(200, {
    description: 'DetallesPedidoP model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetallesPedidoP, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetallesPedidoP, {exclude: 'where'}) filter?: FilterExcludingWhere<DetallesPedidoP>
  ): Promise<DetallesPedidoP> {
    return this.detallesPedidoPRepository.findById(id, filter);
  }

  @patch('/detalles-pedidos-p/{id}')
  @response(204, {
    description: 'DetallesPedidoP PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPedidoP, {partial: true}),
        },
      },
    })
    detallesPedidoP: DetallesPedidoP,
  ): Promise<void> {
    await this.detallesPedidoPRepository.updateById(id, detallesPedidoP);
  }

  @put('/detalles-pedidos-p/{id}')
  @response(204, {
    description: 'DetallesPedidoP PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detallesPedidoP: DetallesPedidoP,
  ): Promise<void> {
    await this.detallesPedidoPRepository.replaceById(id, detallesPedidoP);
  }

  @del('/detalles-pedidos-p/{id}')
  @response(204, {
    description: 'DetallesPedidoP DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detallesPedidoPRepository.deleteById(id);
  }
}

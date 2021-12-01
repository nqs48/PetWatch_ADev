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
PedidoServicio,
DetallesPedidoS,
Servicio,
} from '../models';
import {PedidoServicioRepository} from '../repositories';

export class PedidoServicioServicioController {
  constructor(
    @repository(PedidoServicioRepository) protected pedidoServicioRepository: PedidoServicioRepository,
  ) { }

  @get('/pedido-servicios/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of PedidoServicio has many Servicio through DetallesPedidoS',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio[]> {
    return this.pedidoServicioRepository.servicios(id).find(filter);
  }

  @post('/pedido-servicios/{id}/servicios', {
    responses: {
      '200': {
        description: 'create a Servicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PedidoServicio.prototype.idPedidoS,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInPedidoServicio',
            exclude: ['idServicio'],
          }),
        },
      },
    }) servicio: Omit<Servicio, 'idServicio'>,
  ): Promise<Servicio> {
    return this.pedidoServicioRepository.servicios(id).create(servicio);
  }

  @patch('/pedido-servicios/{id}/servicios', {
    responses: {
      '200': {
        description: 'PedidoServicio.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.pedidoServicioRepository.servicios(id).patch(servicio, where);
  }

  @del('/pedido-servicios/{id}/servicios', {
    responses: {
      '200': {
        description: 'PedidoServicio.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.pedidoServicioRepository.servicios(id).delete(where);
  }
}

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
Servicio,
DetallesPedidoS,
PedidoServicio,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioPedidoServicioController {
  constructor(
    @repository(ServicioRepository) protected servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'Array of Servicio has many PedidoServicio through DetallesPedidoS',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PedidoServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PedidoServicio>,
  ): Promise<PedidoServicio[]> {
    return this.servicioRepository.pedidoServicios(id).find(filter);
  }

  @post('/servicios/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'create a PedidoServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicio.prototype.idServicio,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoServicio, {
            title: 'NewPedidoServicioInServicio',
            exclude: ['idPedidoS'],
          }),
        },
      },
    }) pedidoServicio: Omit<PedidoServicio, 'idPedidoS'>,
  ): Promise<PedidoServicio> {
    return this.servicioRepository.pedidoServicios(id).create(pedidoServicio);
  }

  @patch('/servicios/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'Servicio.PedidoServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoServicio, {partial: true}),
        },
      },
    })
    pedidoServicio: Partial<PedidoServicio>,
    @param.query.object('where', getWhereSchemaFor(PedidoServicio)) where?: Where<PedidoServicio>,
  ): Promise<Count> {
    return this.servicioRepository.pedidoServicios(id).patch(pedidoServicio, where);
  }

  @del('/servicios/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'Servicio.PedidoServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PedidoServicio)) where?: Where<PedidoServicio>,
  ): Promise<Count> {
    return this.servicioRepository.pedidoServicios(id).delete(where);
  }
}

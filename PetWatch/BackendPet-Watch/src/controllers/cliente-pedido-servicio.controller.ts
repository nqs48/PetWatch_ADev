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
  Cliente,
  PedidoServicio,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClientePedidoServicioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'Array of Cliente has many PedidoServicio',
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
    return this.clienteRepository.pedidoServicios(id).find(filter);
  }

  @post('/clientes/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.idCliente,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoServicio, {
            title: 'NewPedidoServicioInCliente',
            exclude: ['idPedidoS'],
            optional: ['clienteId']
          }),
        },
      },
    }) pedidoServicio: Omit<PedidoServicio, 'idPedidoS'>,
  ): Promise<PedidoServicio> {
    return this.clienteRepository.pedidoServicios(id).create(pedidoServicio);
  }

  @patch('/clientes/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'Cliente.PedidoServicio PATCH success count',
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
    return this.clienteRepository.pedidoServicios(id).patch(pedidoServicio, where);
  }

  @del('/clientes/{id}/pedido-servicios', {
    responses: {
      '200': {
        description: 'Cliente.PedidoServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PedidoServicio)) where?: Where<PedidoServicio>,
  ): Promise<Count> {
    return this.clienteRepository.pedidoServicios(id).delete(where);
  }
}

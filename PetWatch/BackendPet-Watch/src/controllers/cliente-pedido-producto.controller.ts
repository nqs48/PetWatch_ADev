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
  PedidoProducto,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClientePedidoProductoController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Array of Cliente has many PedidoProducto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PedidoProducto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PedidoProducto>,
  ): Promise<PedidoProducto[]> {
    return this.clienteRepository.pedidoProductos(id).find(filter);
  }

  @post('/clientes/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoProducto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.idCliente,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProducto, {
            title: 'NewPedidoProductoInCliente',
            exclude: ['idPedidoP'],
            optional: ['idCliente']
          }),
        },
      },
    }) pedidoProducto: Omit<PedidoProducto, 'idPedidoP'>,
  ): Promise<PedidoProducto> {
    return this.clienteRepository.pedidoProductos(id).create(pedidoProducto);
  }

  @patch('/clientes/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Cliente.PedidoProducto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProducto, {partial: true}),
        },
      },
    })
    pedidoProducto: Partial<PedidoProducto>,
    @param.query.object('where', getWhereSchemaFor(PedidoProducto)) where?: Where<PedidoProducto>,
  ): Promise<Count> {
    return this.clienteRepository.pedidoProductos(id).patch(pedidoProducto, where);
  }

  @del('/clientes/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Cliente.PedidoProducto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PedidoProducto)) where?: Where<PedidoProducto>,
  ): Promise<Count> {
    return this.clienteRepository.pedidoProductos(id).delete(where);
  }
}

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
PedidoProducto,
DetallesPedidoP,
Producto,
} from '../models';
import {PedidoProductoRepository} from '../repositories';

export class PedidoProductoProductoController {
  constructor(
    @repository(PedidoProductoRepository) protected pedidoProductoRepository: PedidoProductoRepository,
  ) { }

  @get('/pedido-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of PedidoProducto has many Producto through DetallesPedidoP',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.pedidoProductoRepository.productos(id).find(filter);
  }

  @post('/pedido-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'create a Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PedidoProducto.prototype.idPedidoP,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInPedidoProducto',
            exclude: ['idProducto'],
          }),
        },
      },
    }) producto: Omit<Producto, 'idProducto'>,
  ): Promise<Producto> {
    return this.pedidoProductoRepository.productos(id).create(producto);
  }

  @patch('/pedido-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'PedidoProducto.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.pedidoProductoRepository.productos(id).patch(producto, where);
  }

  @del('/pedido-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'PedidoProducto.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.pedidoProductoRepository.productos(id).delete(where);
  }
}

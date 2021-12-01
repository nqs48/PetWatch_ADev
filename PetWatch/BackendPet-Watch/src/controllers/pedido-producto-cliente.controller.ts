import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PedidoProducto,
  Cliente,
} from '../models';
import {PedidoProductoRepository} from '../repositories';

export class PedidoProductoClienteController {
  constructor(
    @repository(PedidoProductoRepository)
    public pedidoProductoRepository: PedidoProductoRepository,
  ) { }

  @get('/pedido-productos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to PedidoProducto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof PedidoProducto.prototype.idPedidoP,
  ): Promise<Cliente> {
    return this.pedidoProductoRepository.cliente(id);
  }
}

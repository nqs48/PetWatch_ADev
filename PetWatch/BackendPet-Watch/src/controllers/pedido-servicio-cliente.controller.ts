import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PedidoServicio,
  Cliente,
} from '../models';
import {PedidoServicioRepository} from '../repositories';

export class PedidoServicioClienteController {
  constructor(
    @repository(PedidoServicioRepository)
    public pedidoServicioRepository: PedidoServicioRepository,
  ) { }

  @get('/pedido-servicios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to PedidoServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof PedidoServicio.prototype.idPedidoS,
  ): Promise<Cliente> {
    return this.pedidoServicioRepository.cliente(id);
  }
}

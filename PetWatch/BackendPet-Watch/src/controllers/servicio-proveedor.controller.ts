import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Servicio,
  Proveedor,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioProveedorController {
  constructor(
    @repository(ServicioRepository)
    public servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Proveedor belonging to Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedor)},
          },
        },
      },
    },
  })
  async getProveedor(
    @param.path.string('id') id: typeof Servicio.prototype.idServicio,
  ): Promise<Proveedor> {
    return this.servicioRepository.proveedor(id);
  }
}

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
  Producto,
  Servicio,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoServicioController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Producto has many Servicio',
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
    return this.productoRepository.servicios(id).find(filter);
  }

  @post('/productos/{id}/servicios', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.idProducto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInProducto',
            exclude: ['idServicio'],
            optional: ['productoId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'idServicio'>,
  ): Promise<Servicio> {
    return this.productoRepository.servicios(id).create(servicio);
  }

  @patch('/productos/{id}/servicios', {
    responses: {
      '200': {
        description: 'Producto.Servicio PATCH success count',
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
    return this.productoRepository.servicios(id).patch(servicio, where);
  }

  @del('/productos/{id}/servicios', {
    responses: {
      '200': {
        description: 'Producto.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.productoRepository.servicios(id).delete(where);
  }
}

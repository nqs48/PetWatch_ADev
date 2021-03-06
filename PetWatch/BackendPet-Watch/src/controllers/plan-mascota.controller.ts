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
Plan,
PagoPlanes,
Mascota,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanMascotaController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of Plan has many Mascota through PagoPlanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascota>,
  ): Promise<Mascota[]> {
    return this.planRepository.mascotas(id).find(filter);
  }

  @post('/plans/{id}/mascotas', {
    responses: {
      '200': {
        description: 'create a Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plan.prototype.idPlan,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInPlan',
            exclude: ['idMascota'],
          }),
        },
      },
    }) mascota: Omit<Mascota, 'idMascota'>,
  ): Promise<Mascota> {
    return this.planRepository.mascotas(id).create(mascota);
  }

  @patch('/plans/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Plan.Mascota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {partial: true}),
        },
      },
    })
    mascota: Partial<Mascota>,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.planRepository.mascotas(id).patch(mascota, where);
  }

  @del('/plans/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Plan.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.planRepository.mascotas(id).delete(where);
  }
}

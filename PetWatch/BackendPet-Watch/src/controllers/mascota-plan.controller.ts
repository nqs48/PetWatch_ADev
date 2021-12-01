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
Mascota,
PagoPlanes,
Plan,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaPlanController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of Mascota has many Plan through PagoPlanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Plan>,
  ): Promise<Plan[]> {
    return this.mascotaRepository.planes(id).find(filter);
  }

  @post('/mascotas/{id}/plans', {
    responses: {
      '200': {
        description: 'create a Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.idMascota,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInMascota',
            exclude: ['idPlan'],
          }),
        },
      },
    }) plan: Omit<Plan, 'idPlan'>,
  ): Promise<Plan> {
    return this.mascotaRepository.planes(id).create(plan);
  }

  @patch('/mascotas/{id}/plans', {
    responses: {
      '200': {
        description: 'Mascota.Plan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    })
    plan: Partial<Plan>,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.mascotaRepository.planes(id).patch(plan, where);
  }

  @del('/mascotas/{id}/plans', {
    responses: {
      '200': {
        description: 'Mascota.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.mascotaRepository.planes(id).delete(where);
  }
}

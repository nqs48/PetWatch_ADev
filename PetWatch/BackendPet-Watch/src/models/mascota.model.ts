import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Plan} from './plan.model';
import {PagoPlanes} from './pago-planes.model';
import {Funcionario} from './funcionario.model';
import {Visita} from './visita.model';
import {Solicitud} from './solicitud.model';

@model()
export class Mascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idMascota?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  especie: string;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => Plan, {through: {model: () => PagoPlanes}})
  planes: Plan[];

  @hasMany(() => Funcionario, {through: {model: () => Visita}})
  funcionarios: Funcionario[];

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;

import {Entity, model, property, hasMany} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Visita} from './visita.model';
import {Solicitud} from './solicitud.model';

@model()
export class Funcionario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idFuncionario?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  cargo: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'string',
    required: true,
  })
  credencial: string;

  @hasMany(() => Mascota, {through: {model: () => Visita}})
  mascotas: Mascota[];

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  constructor(data?: Partial<Funcionario>) {
    super(data);
  }
}

export interface FuncionarioRelations {
  // describe navigational properties here
}

export type FuncionarioWithRelations = Funcionario & FuncionarioRelations;

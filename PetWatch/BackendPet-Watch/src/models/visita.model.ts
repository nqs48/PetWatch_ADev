import {Entity, model, property} from '@loopback/repository';

@model()
export class Visita extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idVisita?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaVisita: string;

  @property({
    type: 'string',
  })
  mascotaId?: string;

  @property({
    type: 'string',
  })
  funcionarioId?: string;

  constructor(data?: Partial<Visita>) {
    super(data);
  }
}

export interface VisitaRelations {
  // describe navigational properties here
}

export type VisitaWithRelations = Visita & VisitaRelations;

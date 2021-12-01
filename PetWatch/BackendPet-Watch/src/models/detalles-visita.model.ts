import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class DetallesVisita extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idDetallesVisita?: string;

  @property({
    type: 'number',
    required: true,
  })
  peso: number;

  @property({
    type: 'number',
    required: true,
  })
  temperatura: number;

  @property({
    type: 'number',
    required: true,
  })
  freqRespiratoria: number;

  @property({
    type: 'number',
    required: true,
  })
  freqCardiaca: number;

  @property({
    type: 'string',
    required: true,
  })
  estadoAnimo: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DetallesVisita>) {
    super(data);
  }
}

export interface DetallesVisitaRelations {
  // describe navigational properties here
}

export type DetallesVisitaWithRelations = DetallesVisita & DetallesVisitaRelations;

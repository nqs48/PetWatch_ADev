import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class DetallesPedidoS extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idDetallesPedidoS?: string;

  @property({
    type: 'number',
    required: true,
  })
  precioUnitario: number;

  @property({
    type: 'number',
    required: true,
  })
  precioTotal: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
  })
  pedidoServicioId?: string;

  @property({
    type: 'string',
  })
  servicioId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DetallesPedidoS>) {
    super(data);
  }
}

export interface DetallesPedidoSRelations {
  // describe navigational properties here
}

export type DetallesPedidoSWithRelations = DetallesPedidoS & DetallesPedidoSRelations;

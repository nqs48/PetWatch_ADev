import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class DetallesPedidoP extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idDetallesPedidoP?: string;

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
  pedidoProductoId?: string;

  @property({
    type: 'string',
  })
  productoId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DetallesPedidoP>) {
    super(data);
  }
}

export interface DetallesPedidoPRelations {
  // describe navigational properties here
}

export type DetallesPedidoPWithRelations = DetallesPedidoP & DetallesPedidoPRelations;

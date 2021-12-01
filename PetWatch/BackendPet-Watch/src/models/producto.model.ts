import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Proveedor} from './proveedor.model';
import {Servicio} from './servicio.model';
import {PedidoProducto} from './pedido-producto.model';
import {DetallesPedidoP} from './detalles-pedido-p.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idProducto?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @belongsTo(() => Proveedor)
  proveedorId: string;

  @hasMany(() => Servicio)
  servicios: Servicio[];

  @hasMany(() => PedidoProducto, {through: {model: () => DetallesPedidoP}})
  pedidoProductos: PedidoProducto[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;

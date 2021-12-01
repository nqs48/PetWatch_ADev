import {Entity, model, property, hasMany} from '@loopback/repository';
import {PedidoProducto} from './pedido-producto.model';
import {PedidoServicio} from './pedido-servicio.model';
import {Mascota} from './mascota.model';
import {Solicitud} from './solicitud.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idCliente?: string;

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
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @hasMany(() => PedidoProducto, {keyTo: 'idCliente'})
  pedidoProductos: PedidoProducto[];

  @hasMany(() => PedidoServicio)
  pedidoServicios: PedidoServicio[];

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;

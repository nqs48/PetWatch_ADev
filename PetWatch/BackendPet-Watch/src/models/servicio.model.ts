import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Proveedor} from './proveedor.model';
import {PedidoServicio} from './pedido-servicio.model';
import {DetallesPedidoS} from './detalles-pedido-s.model';
import {Cliente} from './cliente.model';
import {Funcionario} from './funcionario.model';

@model()
export class Servicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idServicio?: string;

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

  @belongsTo(() => Proveedor)
  proveedorId: string;

  @property({
    type: 'string',
  })
  productoId?: string;

  @hasMany(() => PedidoServicio, {through: {model: () => DetallesPedidoS}})
  pedidoServicios: PedidoServicio[];

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Funcionario)
  funcionarioId: string;

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;

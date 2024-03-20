import { Servicios } from "../../Models/Servicios.model"
import { Opiniones } from "../../Models/opiniones.model"

export interface Evento {
    id: number
    titulo: string
    descripcion?: string
    fecha_comienzo: string
    hora_comienzo: string

    discount: number
    costo_pagado: number

    paquete: number
    cliente: number
    fecha: number
    tipo_pago: number
    estado_evento: number
    hora_extra: number
    quinta: number

    costo_horas_extras: number
    costo_paquete: number
    costo_fecha: number
    costo_total: number

    opiniones?: Opiniones[]
    servicios?: Servicios[]
}

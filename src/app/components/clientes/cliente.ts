import { Evento } from "../eventos/evento"

export interface Cliente {
    id: Number
    nombre: string
    apellido_paterno: string
    apellido_materno: string
    fecha_de_nacimiento: string
    email: string
    telefono: string
    genero: string
    eventos?: Evento[]
}
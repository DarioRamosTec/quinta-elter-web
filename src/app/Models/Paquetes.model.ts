import { Evento } from "../components/eventos/evento"

export interface Paquetes {
    id: number
    nombre: string
    descripcion?: String | null
    eventos?: Evento[]
    precio: number
}
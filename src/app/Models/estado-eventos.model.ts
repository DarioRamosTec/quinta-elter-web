import { Evento } from "../components/eventos/evento"

export interface EstadosEventos {
    id: number
    nombre: string
    descripcion?: String | null
    eventos?: Evento[]
}
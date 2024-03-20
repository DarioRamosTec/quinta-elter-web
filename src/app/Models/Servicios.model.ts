import { Evento } from "../components/eventos/evento"

export interface Servicios {
    id: number
    nombre: string
    descripcion?: String | null

    eventos?: Evento[] | null

}
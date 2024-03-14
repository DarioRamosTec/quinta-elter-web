import { Evento } from "../components/eventos/evento";

export interface TipoPagos{
    id : number;
    nombre : string;
    descripcion ?: String | null;
    eventos?: Evento[]
}

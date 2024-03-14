import { Evento } from "../components/eventos/evento";

export interface Fechas {
    id: number;
    dia_inicio: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    dia_final: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    costo: number
    eventos?: Evento[]
}
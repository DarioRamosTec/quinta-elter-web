export interface CreateTipoEventos {
    nombre: string;
    descripcion: string;
  }
 
  export interface TipoEventosindex{
    id: number;
    nombre: string;
    descripcion: string;
  }
 
  export interface TipoEventosEdit{
    id: number;
    nombre: string;
    descripcion: string;
  }

  export interface TipoEventosDestroy {
    id: number;
    nombre: string;
    descripcion: string;
  }

  // src/app/Models/tipo-eventos_model.ts
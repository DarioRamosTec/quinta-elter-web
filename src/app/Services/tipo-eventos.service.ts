import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTipoEventos } from '../Models/tipo-eventos_model'; // Ajusta la ruta según la estructura de tu proyecto
import { TipoEventosindex, TipoEventosEdit, TipoEventosDestroy } from '../Models/tipo-eventos_model'; // Ajusta la ruta según la estructura de tu proyecto
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoEventosService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTiposEventos(): Observable<TipoEventosindex[]> {
    return this.http.get<TipoEventosindex[]>(`${this.apiUrl}/tipo_eventos`);
  }

  crearTipoEvento(tipoEvento: CreateTipoEventos): Observable<CreateTipoEventos> {
    return this.http.post<CreateTipoEventos>(`${this.apiUrl}/tipo_eventos`, tipoEvento);
  }

  actualizarTipoEvento(id: number, tipoEvento: TipoEventosEdit): Observable<TipoEventosEdit> {
    return this.http.put<TipoEventosEdit>(`${this.apiUrl}/tipo_eventos/${id}`, tipoEvento);
  }

  eliminarTipoEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tipo_eventos/${id}`);
  }
}

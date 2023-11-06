import { Injectable } from '@angular/core';
import { Autor } from '../models/autor.model';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutoresService {
  baseUrl = environment.baseUrl;
  private autoresLista: Autor[] = [];
  private autoresSubject = new Subject<Autor[]>();

  constructor(private http: HttpClient) {}

  obtenerAutores() {
    this.http
      .get<Autor[]>(this.baseUrl + 'api/LibreriaAutor')
      .subscribe((data) => {
        this.autoresLista = data;
        this.autoresSubject.next([...this.autoresLista]);
      });
  }

  obtenerActualListener() {
    return this.autoresSubject.asObservable();
  }
}
//db.Libro.update({},{$set:{autor:{_id:'', nombreCompleto:''}}}, false, true)

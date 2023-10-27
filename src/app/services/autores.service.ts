import { Injectable } from "@angular/core";
import { Autor } from "../models/autor.model";

@Injectable({
  providedIn: "root",
})
export class AutoresService {
  private autoresLista: Autor[] = [
    {
      autorId: 1,
      nombre: "Alexander",
      apellido: "Montenegro",
      gradoAcademico: "Ingeniero en Sistemas",
    },
    {
      autorId: 2,
      nombre: "Alejandro",
      apellido: "Gaitan",
      gradoAcademico: "Ingeniero en Computacion",
    },
  ];

  obtenerAutores() {
    return this.autoresLista.slice();
  }
}

import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { LoginData } from "../models/seguridad/login-data.model";
import { Usuario } from "../models/usuario.model";
import { Injectable } from "@angular/core";

@Injectable()
export class SeguridadService {
  private usuario!: Usuario | null;
  seguridadCambio = new Subject<boolean>();

  constructor(private router: Router) {}

  registrarUsuario(usr: Usuario) {
    this.usuario = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usr.nombre,
      apellidos: usr.apellidos,
      username: usr.username,
      password: usr.password,
    };
    this.seguridadCambio.next(true);
    this.router.navigate(["/"]);
  }
  login(lgD: LoginData) {
    this.usuario = {
      email: lgD.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: "",
      apellidos: "",
      username: "",
      password: "",
    };
    this.seguridadCambio.next(true);
    this.router.navigate(["/"]);
  }
  salirSesion() {
    this.usuario = null;
    this.seguridadCambio.next(false);
    this.router.navigate(["login"]);
  }
  obtenerUsuario() {
    return { ...this.usuario }; // se busca devolver la informacion del usuario lo mas actualizado, por eso el operador utilizado
  }

  onSesion() {
    return this.usuario != null;
  }
}

import { Component, NgModule } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent {
  constructor(private seguridadService: SeguridadService) {}

  ngOnInit(): void {}

  registrarUsuario(form: NgForm) {
    this.seguridadService.registrarUsuario({
      email: form.value.email,
      usuarioId: '',
      nombre: form.value.nombre,
      password: form.value.password,
      apellidos: form.value.apellido,
      username: form.value.userName,
    });
  }
}

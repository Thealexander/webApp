import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { SeguridadService } from '../../services/seguridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css'],
})
export class BarraComponent implements OnInit, OnDestroy {
  @Output() menuToogle = new EventEmitter<void>();
  estadoUsuario!: boolean;
  usuarioSubscription!: Subscription;

  constructor(private seguridadService: SeguridadService) {}
  ngOnInit(): void {
    this.seguridadService.seguridadCambio.subscribe((status) => {
      this.estadoUsuario = status;
    });
  }

  onMenuToogleDispatch() {
    this.menuToogle.emit();
  }
  ngOnDestroy(){
    this.usuarioSubscription.unsubscribe();
  }
  endSession(){
    this.seguridadService.salirSesion();
  }
}

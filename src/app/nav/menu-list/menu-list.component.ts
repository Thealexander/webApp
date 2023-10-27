import {
  Component,
  EventEmitter,
  Output,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SeguridadService } from '../../services/seguridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent implements OnInit, OnDestroy {
  @Output() menuToogle = new EventEmitter<void>();
  estadoUsuario!: boolean;
  usuarioSubscription!: Subscription;

  constructor(private seguridadService: SeguridadService) {}
  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadService.seguridadCambio.subscribe(
      (status) => {
        this.estadoUsuario = status;
      }
    );
  }

  onCerrarMenu() {
    this.menuToogle.emit();
  }
  endSession() {
    this.onCerrarMenu();
    this.seguridadService.salirSesion();
  }
  ngOnDestroy(): void {
    this.usuarioSubscription.unsubscribe();
  }
}

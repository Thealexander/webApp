import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AutoresService } from '../services/autores.service';
import { Autor } from '../models/autor.model';
//import { BookNuevoComponent } from './book-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
})
export class AutoresComponent implements OnInit, AfterViewInit, OnDestroy {
  autorData: Autor[] = [];
  desplegarColumnas = ['nombre', 'apellido', 'gradoAcademico'];
  dataSource = new MatTableDataSource<Autor>();

  @ViewChild(MatSort) ordenamiento!: MatSort; // Agregado '!' para indicar que será inicializado posteriormente
  @ViewChild(MatPaginator) paginacion!: MatPaginator;

  private autorSubscription!: Subscription;

  constructor(
    private autoresService: AutoresService,
    private dialog: MatDialog
  ) {}

  hacerFiltro(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.autoresService.obtenerAutores();
    this.autorSubscription = this.autoresService
      .obtenerActualListener()
      .subscribe((autores: Autor[]) => {
        this.dataSource.data = autores;
      });

    //ESTO ES CUANDO ES SOLO JSON
    //  this.dataSource.data = this.autoresService.obtenerAutores();
    // this.autorSubscription = this.autoresService.AutorSubject.subscribe(() => {
    //   this.dataSource.data = this.autoresService.obtenerAutores();
    // });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }
  ngOnDestroy() {
    this.autorSubscription.unsubscribe();
  }
}

import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BooksService } from '../services/books.service';
import { Books } from '../models/books.model';
import { BookNuevoComponent } from './book-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PaginationBooks } from '../models/pagination.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  bookData: Books[] = [];
  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();
  timeOut: any = null;

  @ViewChild(MatSort) ordenamiento!: MatSort; // Agregado '!' para indicar que será inicializado posteriormente
  @ViewChild(MatPaginator) paginacion!: MatPaginator;

  private bookSubscription!: Subscription;
  totalLibros = 0;
  librosPorPagina = 0;
  paginaCombo = [1, 2, 5, 10];
  paginaActual = 1;
  sort = 'titulo';
  sortDirection = 'asc';
  filterValue: { propiedad: string; valor: any } | null = null;

  constructor(private booksService: BooksService, private dialog: MatDialog) {}
  eventPaginador(event: PageEvent) {
    this.librosPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;

    this.booksService.ObtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }
  ordenarColumna(event: any) {
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.booksService.ObtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      event.active,
      event.direction,
      this.filterValue
    );
  }

  hacerFiltro(event: any) {
    // const filtro = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filtro.trim().toLowerCase();
    clearTimeout(this.timeOut);
    const $this = this;
    this.timeOut = setTimeout(() => {
      if (event.keyCode !== 13) {
        const filterValueLocal = {
          propiedad: 'titulo',
          valor: event.target.value,
        };

        $this.filterValue = filterValueLocal;

        $this.booksService.ObtenerLibros(
          $this.librosPorPagina,
          $this.paginaActual,
          $this.sort,
          $this.sortDirection,
          filterValueLocal
        );
      }
    }, 500);
  }
  OpenDialog() {
    const dialogRef = this.dialog.open(BookNuevoComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.booksService.ObtenerLibros(
        this.librosPorPagina,
        this.paginaActual,
        this.sort,
        this.sortDirection,
        this.filterValue
      );
    });
  }

  ngOnInit(): void {
    this.booksService.ObtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
    this.booksService
      .obtenerActualListener()
      .subscribe((pagination: PaginationBooks) => {
        this.dataSource = new MatTableDataSource<Books>(pagination.data);
        this.totalLibros - pagination.totalRows;
      });

    //  this.dataSource.data = this.booksService.ObtenerLibros();
    // this.bookSubscription = this.booksService.bookSubject.subscribe(() => {
    //   this.dataSource.data = this.booksService.ObtenerLibros();
    // });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }
  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }
}

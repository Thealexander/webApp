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
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  bookData: Books[] = [];
  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();

  @ViewChild(MatSort) ordenamiento!: MatSort; // Agregado '!' para indicar que será inicializado posteriormente
  @ViewChild(MatPaginator) paginacion!: MatPaginator;

  private bookSubscription!: Subscription;

  constructor(private booksService: BooksService, private dialog: MatDialog) {}

  hacerFiltro(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
  OpenDialog() {
    this.dialog.open(BookNuevoComponent, {
      width: '350px',
    });
  }

  ngOnInit(): void {
    this.dataSource.data = this.booksService.ObtenerLibros();
    this.bookSubscription = this.booksService.bookSubject.subscribe(() => {
      this.dataSource.data = this.booksService.ObtenerLibros();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }
  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }
}

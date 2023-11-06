import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { BooksService } from '../services/books.service';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Autor } from '../models/autor.model';
import { AutoresService } from '../services/autores.service';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: './book-dialog.component.html',
})
export class BookNuevoComponent implements OnInit, OnDestroy {
  selectAutorTexto?: string;
  selectAutor?: string;
  fechaPublicacion: string =' ';

  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;

  autores: Autor[] = [];
  autorSubscription: Subscription;

  constructor(
    private bookService: BooksService,
    private dialogRef: MatDialog,
    private autoresService: AutoresService
  ) {
    this.autorSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.autoresService.obtenerAutores();
    this.autorSubscription = this.autoresService
      .obtenerActualListener()
      .subscribe((autoresBackend: Autor[]) => {
        this.autores = autoresBackend;
      });
  }

  selected(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }

  guardarLibro(form: NgForm) {
    if (form.valid) {
      const autorRequest = {
        id: this.selectAutor,
        nombreCompleto: this.selectAutorTexto,
      };

      const libroRequest = {
        id: null,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: autorRequest,
        precio: parseFloat(form.value.precio), // Use parseFloat for decimal values
        fechaPublicacion: new Date(this.fechaPublicacion),
      };

      this.bookService.guardarLibros(libroRequest);
      this.autorSubscription = this.bookService
        .guardarLibroListener()
        .subscribe(() => {
          this.dialogRef.closeAll();
        });
    }
  }

  ngOnDestroy() {
    this.autorSubscription.unsubscribe();
  }
}

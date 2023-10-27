import { Component, ComponentRef, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDatepicker } from "@angular/material/datepicker";
import { BooksService } from "../services/books.service";
import { MatSelectChange } from "@angular/material/select";
import { MatOption } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { Autor } from "../models/autor.model";
import { AutoresService } from "../services/autores.service";

@Component({
  selector: "app-book-nuevo",
  templateUrl: "./book-dialog.component.html",
})
export class BookNuevoComponent implements OnInit {
  selectAutorTexto!: string;
  selectAutor!: string;
  fechaPublicacion!: string;
  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;
  autores: Autor[] = [];

  constructor(
    private bookService: BooksService,
    private dialogRef: MatDialog,
    private autoresService: AutoresService
  ) {}

  ngOnInit(): void {
    this.autores = this.autoresService.obtenerAutores();
  }

  selected(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }
  guardarLibro(form: NgForm) {
    if (form.valid) {
      this.bookService.guardarLibros({
        libroId: 1,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: this.selectAutorTexto,
        precio: form.value.precio,
        fechaPublicacion: new Date(this.fechaPublicacion),
      });
      this.dialogRef.closeAll();
    }
  }
}

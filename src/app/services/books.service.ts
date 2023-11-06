import { environment } from 'src/environment/environment';
import { Books } from '../models/books.model';
import { Subject } from 'rxjs';
import { PaginationBooks } from '../models/pagination.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  baseUrl = environment.baseUrl;

  private booksList: Books[] = [];

  bookSubject = new Subject();
  bookPagination!: PaginationBooks;
  bookPaginationSubject = new Subject<PaginationBooks>();

  constructor(private http: HttpClient) {}

  ObtenerLibros(
    libroPorPagina: number,
    paginaActual: number,
    sort: string,
    sortDirection: string,
    filterValue: any
  ) {
    const request = {
      pageSize: libroPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue,
    };

    this.http
      .post<PaginationBooks>(this.baseUrl + 'api/Libro/pagination', request)
      .subscribe((response) => {
       // this.bookPagination = response;
       this.bookPaginationSubject.next(response);

      });
  }

  obtenerActualListener() {
    return this.bookPaginationSubject.asObservable();
  }

  guardarLibros(book: Books) {
    this.http.post(this.baseUrl + 'api/Libro', book).subscribe((response) => {
      this.bookSubject.next(null);
    });
  }

  guardarLibroListener() {
    return this.bookSubject.asObservable();
  }
}

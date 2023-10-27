import { Books } from '../models/books.model';
import { Subject } from 'rxjs';

export class BooksService {
  private booksList: Books[] = [
    {
      libroId: 1,
      titulo: 'Algoritmos',
      descripcion: 'libro basico',
      autor: 'Balexg',
      precio: 18,
    },
  ];

  bookSubject = new Subject<Books>();

  ObtenerLibros() {
    return this.booksList.slice();
  }

  guardarLibros(book: Books) {
    this.booksList.push(book);
    this.bookSubject.next(book);
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';

import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { LoginComponent } from './seguridad/login/login.component';
import { LibroComponent } from './libro/libro/libro.component';
import { LibrosComponent } from './libros/libros/libros.component';
import { HomeComponent } from './home/home/home.component';
import { BarraComponent } from './nav/barra/barra.component';
import { MenuListComponent } from './nav/menu-list/menu-list.component';

import { SeguridadService } from './services/seguridad.service';
import { BooksComponent } from './books/books.component';

import { BookNuevoComponent } from './books/book-dialog.component';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AutoresComponent } from './autores/autores.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    LoginComponent,
    LibroComponent,
    LibrosComponent,
    HomeComponent,
    BarraComponent,
    MenuListComponent,
    BooksComponent,
    BookNuevoComponent,
    AutoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [
    SeguridadService,

    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  bootstrap: [AppComponent],
  //entryComponents:[BookNuevoComponent]
})
export class AppModule {}

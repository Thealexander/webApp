export interface Books {
  id: string | null;
  titulo: string;
  descripcion: string;
  precio: number;
  fechaPublicacion?: Date;
  autor: {
    id?: string;
    nombreCompleto?: string;
  };
}

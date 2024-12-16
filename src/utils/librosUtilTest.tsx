import { Libro } from "../domain/libro";

export function crearLibro(
  id: number = 0,
  titulo: string = '',
  cantidadPalabras: number = 0,
  cantidadPaginas: number = 0,
  paginasParaSerLargo: number = 0,
  cantidadEdiciones: number = 0,
  ventasSemanales: number = 0,
  autor: string = '',
  lenguajeTraduccion: string[] = [],
  lenguajesPublicados: string[] = [],
  lecturaCompleja: boolean = false
): Libro {
  return Object.assign(new Libro(), {
    id,
    titulo,
    cantidadPalabras,
    cantidadPaginas,
    paginasParaSerLargo,
    cantidadEdiciones,
    ventasSemanales,
    autor,
    lenguajeTraduccion,
    lenguajesPublicados,
    lecturaCompleja,
  });
}

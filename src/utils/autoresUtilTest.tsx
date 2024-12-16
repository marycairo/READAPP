import {Autor} from '../domain/autor'

export function crearAutor(
    id: number = 0,
    nombre: string = '',
    apellido: string = '',
    edad: number = 0,
    ganoPremios: boolean = false,
    idiomaNativo: string = '',
    seudonimo: string = '',
): Autor {
  return Object.assign(new Autor(), {
    id,
    nombre,
    apellido,
    edad,
    ganoPremios,
    idiomaNativo,
    seudonimo,
  })
}
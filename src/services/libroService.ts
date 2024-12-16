import axios from 'axios'
import { Libro, LibroJSON } from '../domain/libro'
import { LibroEdit } from '../domain/libroEdit'

class LibroService {
  async getAllLibros(): Promise<Libro[]> {
    const { data: librosJson } = await axios.get<LibroJSON[]>(
      'http://localhost:9000/libros',
    )
    return librosJson.map((libro) => Libro.fromJSON(libro))
  }

  async getLibroById(id: number): Promise<Libro> {
    console.log('service', id)
    const { data } = await axios.get<LibroJSON>(
      `http://localhost:9000/libros/get/${id}`,
    )
    return Libro.fromJSON(data)
  }

  async getLibrosFilter(filter: string): Promise<Libro[]> {
    const { data: librosJson } = await axios.get<LibroJSON[]>(
      `http://localhost:9000/libros/filter?texto=${filter}`,
    )
    return librosJson.map((libro) => Libro.fromJSON(libro))
  }

  async createLibro(libroEdit: LibroEdit): Promise<Libro> {
    const { data: libroJson } = await axios.post<LibroJSON>(
      'http://localhost:9000/libros/crear',
      libroEdit,
    )
    return Libro.fromJSON(libroJson)
  }

  async edicionLibro(id: number, libroEdit: LibroEdit): Promise<Libro> {
    const { data: libroJson } = await axios.put<LibroJSON>(
      `http://localhost:9000/libros/actualizar/${id}`,
      libroEdit,
    )
    return Libro.fromJSON(libroJson)
  }

  async deleteLibro(id: number): Promise<void> {
    return await axios.delete(`http://localhost:9000/libros/${id}`)
  }
}

export const libroService: LibroService = new LibroService()

import axios from 'axios'
import { Autor, AutorJSON } from '../domain/autor'
import { AutorEdit } from '../domain/autorEdit'

class AutorService {
  async getAllAutores(): Promise<Autor[]> {
    const { data: autoresJson } = await axios.get<AutorJSON[]>(
      'http://localhost:9000/autores',
    )
    return autoresJson.map((autor) => Autor.fromJSON(autor))
  }

  async getAutoresFilter(filter: string): Promise<Autor[]> {
    const { data: librosJson } = await axios.get<AutorJSON[]>(
      `http://localhost:9000/autores/buscar/filter?filtro=${filter}`,
    )

    return librosJson.map((autor) => Autor.fromJSON(autor))
  }

  async getAutorById(id: number): Promise<Autor> {
    const { data } = await axios.get<AutorJSON>(
      `http://localhost:9000/autores/${id}`,
    )
    return Autor.fromJSON(data)
  }

  async createAutor(autorEdit: AutorEdit) {
    return axios.post<AutorJSON>(`http://localhost:9000/crear-autor`, autorEdit)
  }
  async edicionAutor(id: number, autorEdit: AutorEdit) {
    return axios.put<AutorJSON>(
      `http://localhost:9000/autores/actualizar/${id}`,
      autorEdit,
    )
  }
  async deleteAutor(id: number) {
    return axios.delete(`http://localhost:9000/autores/${id}`)
  }
}
export const autorService: AutorService = new AutorService()

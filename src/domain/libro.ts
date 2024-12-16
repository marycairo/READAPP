import { Autor, AutorJSON } from './autor'

export type LibroJSON = {
  id?: number
  titulo?: string
  cantidadPalabras?: number
  cantidadPaginas?: number
  paginasParaSerLargo?: number
  cantidadEdiciones?: number
  ventasSemanales?: number
  autor?: AutorJSON
  lenguajesTraduccion?: string[]
  lenguajesPublicados?: string[]
  lecturaCompleja?: boolean
}

export class Libro {
  constructor(
    public id: number = 0,
    public titulo: string = '',
    public cantidadPalabras: number = 0,
    public cantidadPaginas: number = 0,
    public paginasParaSerLargo: number = 600,
    public cantidadEdiciones: number = 0,
    public ventasSemanales: number = 0,
    public autor: Autor = new Autor(),
    public lenguajesTraduccion: string[] = [],
    public lenguajesPublicados: string[] = [],
    public lecturaCompleja: boolean = false,
  ) {}

  static fromJSON(libroJSON: LibroJSON): Libro {
    return Object.assign(new Libro(), libroJSON, {
      autor: libroJSON.autor ? Autor.fromJSON(libroJSON.autor) : undefined,
    })
  }

  toJSON(): LibroJSON {
    return {
      id: this.id,
      titulo: this.titulo,
      cantidadPalabras: this.cantidadPalabras,
      cantidadPaginas: this.cantidadPaginas,
      paginasParaSerLargo: this.paginasParaSerLargo,
      cantidadEdiciones: this.cantidadEdiciones,
      ventasSemanales: this.ventasSemanales,
      autor: this.autor ? this.autor.toJSON() : undefined,
      lenguajesTraduccion: this.lenguajesTraduccion,
      lenguajesPublicados: this.lenguajesPublicados,
      lecturaCompleja: this.lecturaCompleja,
    }
  }

  copy(): Libro {
    return Object.assign(new Libro(), structuredClone(this), {
      autor: this.autor ? this.autor.copy() : undefined,
    })
  }

  esLargo(): boolean {
    return this.cantidadPaginas > (this.paginasParaSerLargo)
  }

  esDesafiante(): boolean {
    return this.lecturaCompleja || this.esLargo()
  }

  esVariado(): boolean {
    return ((this.cantidadEdiciones > 2) || (this.lenguajesTraduccion?.length) >= 5)
  }

  esBestSeller(): boolean {
    return (this.ventasSemanales >= 10000 && this.esVariado())
  }

  coincideTitulo(texto: string): boolean {
    return this.titulo.toLowerCase().includes(texto.toLowerCase())
  }

  coincideApellidoAutor(texto: string): boolean {
    return this.autor.apellido.toLowerCase() === texto.toLowerCase()
  }
}

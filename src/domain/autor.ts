export type AutorJSON = {
  id: number
  nombre: string
  apellido: string
  edad: number
  ganoPremios: boolean
  idiomaNativo: string
  seudonimo: string
}
export class Autor {
  constructor(
    public id: number = 0,
    public nombre: string = '',
    public apellido: string = '',
    public edad: number = 0,
    public ganoPremios: boolean = false,
    public idiomaNativo: string = '',
    public seudonimo: string = '',
  ) {}

  static fromJSON(autorJSON: Partial<AutorJSON>): Autor {
  return Object.assign(new Autor(), {
    id: autorJSON.id || 0,
    nombre: autorJSON.nombre || '',
    apellido: autorJSON.apellido || '',
    idiomaNativo: autorJSON.idiomaNativo || '',
    edad: autorJSON.edad || 0, 
    ganoPremios: autorJSON.ganoPremios || false, 
    seudonimo: autorJSON.seudonimo || '', 
  });
}

  toJSON(): AutorJSON {
    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
      ganoPremios: this.ganoPremios,
      idiomaNativo: this.idiomaNativo,
      seudonimo: this.seudonimo,
    }
  }

  copy(): Autor {
    return Object.assign(new Autor(), this)
  }
}

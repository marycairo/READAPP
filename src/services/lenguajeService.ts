import axios from 'axios'

class LenguajeService {
  async getLenguajes(): Promise<string[]> { 
    const response = await axios.get<string[]>('http://localhost:9000/lenguajes')
    return response.data;
  }
}

export const lenguajeService: LenguajeService = new LenguajeService()

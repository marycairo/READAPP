import axios from 'axios'
export interface InfoCardMap {
  [key: string]: number
}

// const mockInfoCard = {
//   Libros: 10,
//   Recomendaciones: 30,
//   'Centros de Lectura': 10,
//   'Usuarios Totales': 10,
// }

class DashboardService {
  async getInfoCard(): Promise<InfoCardMap> {
    const { data: infoCardJson } = await axios.get<InfoCardMap>(
      'http://localhost:9000/dashboard',
    )
    return infoCardJson
  }
  async deleteUsersInactive() {
    console.log('deleteCentrosLectura')
    axios.delete('http://localhost:9000/dashboard/eliminar-usuarios-inactivos')
  }
  async deleteCentrosLectura() {
    console.log('deleteCentrosLectura')
    axios.delete('http://localhost:9000/dashboard/eliminar-centros-inactivos')
  }
}

export const dashboardService: DashboardService = new DashboardService()

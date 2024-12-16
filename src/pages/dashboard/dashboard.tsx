import { useOnInit } from '../../HookCustom'
import Box from '@mui/material/Box'
import './dashboard.css'
import { dashboardService, InfoCardMap } from '../../services/dashboardService'
import { useState } from 'react'
import CardDash from './cardDash/cardDash'
import { useSnackbar } from 'notistack'
import { ErrorResponse, handleError } from '../../utils/error-handler'

type Props = {
  setTitulo: React.Dispatch<React.SetStateAction<string>>
}

const Dashboard = ({ setTitulo }: Props) => {
  const { enqueueSnackbar } = useSnackbar()

  const [infoCard, setInfoCard] = useState<InfoCardMap>({})

  const changeTitulo = () => setTitulo('Dashboard')

  const traerInfoCards = async () => {
    changeTitulo()
    try {
      const items = await dashboardService.getInfoCard()
      setInfoCard(items)
    } catch (error: unknown) {
      handleError(error as ErrorResponse, enqueueSnackbar)
    }
  }
  const clickDeleteUsers = async () => {
    try {
      await dashboardService.deleteUsersInactive()
      enqueueSnackbar('Usuarios inactivos eliminados', { variant: 'success' })
      traerInfoCards()
    } catch (error) {
      handleError(error as ErrorResponse, enqueueSnackbar)
    }
  }
  const clickDeleteCentros = async () => {
    try {
      await dashboardService.deleteCentrosLectura()
      enqueueSnackbar('Centros inactivos eliminados', { variant: 'success' })
      traerInfoCards()
    } catch (error) {
      handleError(error as ErrorResponse, enqueueSnackbar)
    }
  }

  useOnInit(traerInfoCards)

  return (
    <div>
      <div className="cards">
        {Object.entries(infoCard).map(([clave, value]) => (
          <CardDash key={clave} nombre={clave} valor={value} />
        ))}
      </div>
      <div className="buttons">
        <h1 className="text">Acciones</h1>
        <Box
          className="delete-button"
          onClick={clickDeleteUsers}
          data-testid={'InactiveDeleteUser'}
        >
          <h1>Borrar usuarios inactivos </h1>
        </Box>
        <Box
          className="delete-button"
          onClick={clickDeleteCentros}
          data-testid={'InactiveDeleteCenter'}
        >
          <h1>Borrar centros de lectura inactivos</h1>
        </Box>
      </div>
    </div>
  )
}

export default Dashboard

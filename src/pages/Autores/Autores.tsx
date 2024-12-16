import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import AutorCard from '../../components/cardAutores/AutorCard'
import { autorService } from '../../services/autorService'
import { useState } from 'react'
import { Autor } from '../../domain/autor'
import { useOnInit } from '../../HookCustom'
import { useSnackbar } from 'notistack'
import { ErrorResponse, handleError } from '../../utils/error-handler'

type Props = {
  setTitulo: React.Dispatch<React.SetStateAction<string>>
}

const Autores = ({ setTitulo }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [autores, setAutores] = useState<Autor[]>([])
  const navigate = useNavigate()
  const [filter, setFilter] = useState<string>('')
  const changeTitulo = () => setTitulo('Autores')

  const goToCrear = () => {
    navigate(`/edicionautor/${'new'}`)
  }
  const txtBusquedaFilter = (txtBusqueda: string) => {
    setFilter(txtBusqueda)
    traerAutores(txtBusqueda)
  }
  const traerAutores = async (txtBusqueda: string) => {
    changeTitulo()
    try {
      const autores = await autorService.getAutoresFilter(txtBusqueda)
      setAutores(autores)
    } catch (error: unknown) {
      handleError(error as ErrorResponse, enqueueSnackbar)
    }
  }

  useOnInit(() => traerAutores(filter))

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: '700', margin: '0.5rem' }}>
        Autores
      </Typography>

      <SearchBar cargarFiltro={txtBusquedaFilter} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
          gap: '1rem',
        }}
      >
        {autores.map((autor) => (
          <AutorCard
            key={autor.id}
            autor={autor}
            actualizar={() => traerAutores(filter)}
          />
        ))}
      </div>

      <Fab
        size="small"
        aria-label="add"
        style={{
          backgroundColor: 'rgb(84 11 14)',
          color: 'white',
          position: 'fixed',
          bottom: '100px',
          right: '20px',
        }}
        onClick={goToCrear}
      >
        <AddIcon />
      </Fab>
    </>
  )
}

export default Autores

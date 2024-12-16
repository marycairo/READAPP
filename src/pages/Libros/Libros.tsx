import { Fab, Typography } from '@mui/material'
import LibroCard from '../../components/cards/LibroCard/LibroCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Libro } from '../../domain/libro'
import { useOnInit } from '../../HookCustom'
import { useSnackbar } from 'notistack'
import { ErrorResponse, handleError } from '../../utils/error-handler'


import { libroService } from '../../services/libroService'

type Props = {
  setTitulo: React.Dispatch<React.SetStateAction<string>>
}

const Libros = ({ setTitulo }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [libros, setLibros] = useState<Libro[]>([])
  const navigate = useNavigate()
  const [filter, setFilter] = useState<string>("")
  const changeTitulo = () => setTitulo('Libros')

    const goToCrear = () => {
    navigate(`/edicionlibro/${'new'}`)
  }

  const txtBusquedaFilter =(txtBusqueda : string) => {
    console.log(txtBusqueda)
    setFilter(txtBusqueda)
    traerLibros(txtBusqueda)
  }

  const traerLibros = async (txtBusqueda: string) => {
    changeTitulo()
    try {
      const libros = await libroService.getLibrosFilter(txtBusqueda)
      setLibros(libros)
    } catch (error) {
      handleError(error as ErrorResponse, enqueueSnackbar)
    }
  }

  useOnInit(()=>traerLibros(filter))
  
  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: '700', margin: '0.5rem' }}>
        Libros
      </Typography>

      <SearchBar cargarFiltro={txtBusquedaFilter}/>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
          gap: '1rem',
        }}
      >
        {libros.map((libro) => (
          <LibroCard 
          key={libro.id} 
          libro={libro}
          actualizar={() => traerLibros(filter)}
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

export default Libros

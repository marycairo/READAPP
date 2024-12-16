import './AutorCard.css'
import { Autor } from '../../domain/autor'
import { Trash, Pencil } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { autorService } from '../../services/autorService'
import { enqueueSnackbar } from 'notistack'
import { ErrorResponse, handleError } from '../../utils/error-handler'
import { useState } from 'react'
import ConfirmDialog from '../confirmDialog'

type Props = {
  autor: Autor
  actualizar: () => void
}

const AutorCard = ({ autor, actualizar }: Props) => {
  const navigate = useNavigate()
  const [openDialog, setOpenDialog] = useState(false)
  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  const deleteAutor = async () => {
    try {
      await autorService.deleteAutor(autor.id)
      enqueueSnackbar('Autor eliminado con éxito', { variant: 'success' })
      actualizar()
      handleCloseDialog()
    } catch (error) {
      handleError(error as ErrorResponse, enqueueSnackbar)
      handleCloseDialog()
    }
  }

  const goToEditar = () => {
    navigate(`/edicionautor/${autor.id}`)
  }

  const goToDetalle = () => {
    navigate(`/detalleautor/${autor.id}`)
  }

  return (
    <article>
      <div className="autor-card" data-testid={'autor-card-' + autor.id}>
        <section className="card-content" onClick={goToDetalle}>
          <h2 className="name">
            {autor.nombre} {autor.apellido}
          </h2>
          <h3 className="lenguage">{autor.idiomaNativo}</h3>
        </section>
        <div className="card-actions">
          <Pencil
            size={32}
            onClick={goToEditar}
            data-testid={'accionEditar_' + autor.id}
          />
          <Trash
            size={32}
            color="#c66262"
            onClick={handleOpenDialog}
            data-testid={'accionDelete_' + autor.id}
          />
        </div>
      </div>

      <ConfirmDialog
        open={openDialog}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar al autor ${autor.nombre} ${autor.apellido}?`}
        onClose={handleCloseDialog}
        onConfirm={deleteAutor}
        data-testid={'accionDelete-Dialog_' + autor.id}
      />
    </article>
  )
}

export default AutorCard

import './LibroCard.css'
import {
  Certificate,
  Fire,
  File,
  TextAa,
  Globe,
  CurrencyCircleDollar,
  PencilSimple,
  Trash,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { libroService } from '../../../services/libroService'
import { enqueueSnackbar } from 'notistack'
import { ErrorResponse, handleError } from '../../../utils/error-handler'
import ConfirmDialog from '../../confirmDialog'
import { Libro } from '../../../domain/libro'

type Props = {
  libro: Libro
  actualizar: () => void
}

const LibroCard = ({ libro, actualizar }: Props) => {
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()
  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  const deleteLibro = async () => {
    try {
      await libroService.deleteLibro(libro.id)
      enqueueSnackbar('Libro eliminado con éxito', { variant: 'success' })
      actualizar()
      handleCloseDialog()
    } catch (error) {
      handleError(error as ErrorResponse, enqueueSnackbar)
      handleCloseDialog()
    }
  }

  const goToEditar = () => {
    navigate(`/edicionlibro/${libro.id}`)
  }

  return (
    <article className="book-card" data-testid={'libro-card-' + libro.id}>
      <section className="book-imagen">
        <img src={`assets/images/libros/${libro.id}.jpg`} alt="portada-libro" />
        <PencilSimple
          size={28}
          weight="light"
          className="ph-pencil"
          onClick={goToEditar}
          data-testid={'accionEditar_' + libro.id}
        />
        <Trash
          size={28}
          className="delete"
          onClick={handleOpenDialog}
          data-testid={'accionDelete_' + libro.id}
        />
      </section>

      <section className="informacion">
        <div className="informacion-principal">
          <div className="book-titulo">
            <div className="text-container">
              <h2 className="truncate-text">{libro.titulo}</h2>
            </div>
            <div>
              {libro.esBestSeller() && (
                <Certificate
                  size={24}
                  weight="fill"
                  className="ph-certificate"
                />
              )}
              {libro.esDesafiante() && (
                <Fire size={24} weight="fill" className="ph-fire" />
              )}
            </div>
          </div>
          <h3>
            Por {libro.autor?.nombre} {libro.autor?.apellido}
          </h3>
        </div>
        <div className="informacion-secundaria">
          <h4>
            <File size={24} weight="light" /> {libro.cantidadPaginas} páginas
          </h4>
          <h4>
            <TextAa size={24} weight="light" /> {libro.cantidadPalabras}{' '}
            palabras
          </h4>
          <h4>
            <CurrencyCircleDollar size={24} weight="light" />{' '}
            {libro.ventasSemanales} ventas semanales
          </h4>
          <h4>
            <Globe size={24} weight="light" />{' '}
            {libro.lenguajesTraduccion
              ?.map(
                (lang) =>
                  lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase(),
              )
              .join(' - ')}
          </h4>
        </div>
      </section>

      <ConfirmDialog
        open={openDialog}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar el libro "${libro.titulo}"?`}
        onClose={handleCloseDialog}
        onConfirm={deleteLibro}
        data-testid={'accionDelete-Dialog_' + libro.id}
      />
    </article>
  )
}
export default LibroCard

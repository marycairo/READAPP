import React, { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { autorService } from '../../services/autorService'
import { libroService } from '../../services/libroService'
import { lenguajeService } from '../../services/lenguajeService'
import { useSnackbar } from 'notistack'
import { ErrorResponse, handleError } from '../../utils/error-handler'
import { Autor } from '../../domain/autor'
import { LibroEdit } from '../../domain/libroEdit'
import { Libro } from '../../domain/libro'
import ConfirmDialog from '../../components/confirmDialog'
import { Certificate, Fire } from '@phosphor-icons/react'

type Props = {
  setTitulo: React.Dispatch<React.SetStateAction<string>>
  libro: Libro
}

const EdicionLibros = ({ setTitulo, libro }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [titulo, setTituloLibro] = useState<string>('')
  const [autor, setAutor] = useState<Autor | null>(null)
  const [cantidadEdiciones, setCantidadEdiciones] = useState(0)
  const [cantidadPaginas, setCantidadPaginas] = useState(0)
  const [cantidadPalabras, setCantidadPalabras] = useState(0)
  const [ventasSemanales, setVentasSemanales] = useState(0)
  const [lecturaCompleja, setLecturaCompleja] = useState(false)
  const [lenguajesTraduccion, setLenguajesTraduccion] = useState<string[]>([])
  const [idiomaNativo, setIdiomaNativo] = useState<string>('')
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [huboCambios, setHuboCambios] = useState<boolean>(false)
  const [errors, setErrors] = useState({
    titulo: '',
    autor: '',
    cantidadEdiciones: '',
    cantidadPaginas: '',
    cantidadPalabras: '',
  })

  const [autores, setAutores] = useState<Autor[]>([])
  const [idiomas, setIdiomas] = useState<string[]>([])

  const changeTitulo = () => setTitulo('Edicion Libros')

  const traerLibro = async () => {
    changeTitulo()
    if (id !== 'new') {
      try {
        const libro = await libroService.getLibroById(Number(id))
        setTituloLibro(libro.titulo)
        setAutor(libro.autor)
        setCantidadEdiciones(libro.cantidadEdiciones)
        setCantidadPaginas(libro.cantidadPaginas)
        setCantidadPalabras(libro.cantidadPalabras)
        setVentasSemanales(libro.ventasSemanales)
        setLecturaCompleja(libro.lecturaCompleja)
        setLenguajesTraduccion(libro.lenguajesTraduccion)
      } catch (error) {
        handleError(error as ErrorResponse, enqueueSnackbar)
      }
    }
  }

  const traerAutores = async () => {
    try {
      const autores = await autorService.getAllAutores()
      setAutores(autores)
    } catch (error) {
      handleError(error as ErrorResponse, enqueueSnackbar)
    }
  }

  const traerIdiomas = async () => {
    try {
      const idiomas = await lenguajeService.getLenguajes()
      setIdiomas(idiomas)
    } catch (error) {
      handleError(error as ErrorResponse, enqueueSnackbar)
    }
  }

  const handleCheckboxChange = (lenguaje: string) => {
    setLenguajesTraduccion((prevState) =>
      prevState.includes(lenguaje)
        ? prevState.filter((item) => item !== lenguaje)
        : [...prevState, lenguaje],
    )
  }

  const handleAutorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAutorId = parseInt(e.target.value, 10)
    const autorSeleccionado = autores.find(
      (autor) => autor.id === selectedAutorId,
    )
    setAutor(autorSeleccionado || null)
    setIdiomaNativo(autorSeleccionado?.idiomaNativo || '')
  }

  const validate = () => {
    const tempErrors = {
      titulo: '',
      autor: '',
      cantidadEdiciones: '',
      cantidadPaginas: '',
      cantidadPalabras: '',
    }

    if (!titulo) tempErrors.titulo = 'El título es requerido'
    if (!autor) tempErrors.autor = 'El autor es requerido'
    if (!cantidadEdiciones) tempErrors.cantidadEdiciones = 'Ingrese la cantidad de ediciones'
    if (!cantidadPaginas) tempErrors.cantidadPaginas = 'Ingrese la cantidad de paginas'
    if (!cantidadPalabras) tempErrors.cantidadPalabras = 'Ingrese la cantidad de palabras'

    setErrors(tempErrors)
    return Object.values(tempErrors).every((x) => x === '')
  }

  useEffect(() => {
    traerLibro()
    traerAutores()
    traerIdiomas()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validate()) {
      enqueueSnackbar('Por favor, complete todos los campos requeridos', {
        variant: 'error',
      })
      return
    }

    const libroEdit: LibroEdit = {
      titulo,
      cantidadEdiciones,
      cantidadPaginas,
      cantidadPalabras,
      paginasParaSerLargo: 0,
      ventasSemanales,
      autor: autor ? autor.id : 0,
      lecturaCompleja,
      lenguajesTraduccion,
      lenguajesPublicados: [],
    }

    try {
      if (id === 'new') {
        await libroService.createLibro(libroEdit)
        enqueueSnackbar('Libro creado con éxito', { variant: 'success' })
      } else {
        await libroService.edicionLibro(Number(id), libroEdit)
        enqueueSnackbar('Libro actualizado con éxito', { variant: 'success' })
      }
      navigate('/libros')
    } catch (error) {
      handleError(error as ErrorResponse, enqueueSnackbar)
    }
  }

  const volver = () => {
    if (huboCambios) {
      setOpenDialog(true)
    } else {
      navigate('/libros')
    }
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
  }

  const handleConfirmCancel = () => {
    setOpenDialog(false)
    navigate('/libros')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHuboCambios(true)
    const { name, value } = e.target

    const parseToNumber = (value: string): number => {
      const parsedValue = Number(value)
    return isNaN(parsedValue) ? 0 : parsedValue
    }

    if (name === 'titulo') {
      setTituloLibro(value)
    } else if (name === 'cantidadEdiciones') {
      setCantidadEdiciones(parseToNumber(value))
    } else if (name === 'cantidadPaginas') {
      setCantidadPaginas(parseToNumber(value))
    } else if (name === 'cantidadPalabras') {
      setCantidadPalabras(parseToNumber(value))
    } else if (name === 'ventasSemanales') {
      setVentasSemanales(parseToNumber(value))
    }
  }

  return (
    <>
      <Box>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: '700', margin: '0.5rem' }}>
            Libros
          </Typography>

          <div>
              {libro && libro.esBestSeller() && (<Certificate size={24} weight="light"/>)}
              {libro && libro.esDesafiante() && (<Fire size={24} weight="light" className="ph-fire" />)}
          </div>
        </Box>

        <Box
          component="form"
          sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
          onSubmit={handleSubmit}
        >
          <TextField
            sx={{ width: '100%' }}
            value={titulo}
            onChange={handleInputChange}
            size="small"
            label="Titulo"
            name="titulo"
            error={!!errors.titulo}
            helperText={errors.titulo || 'Ingrese el título del libro'}
          />

          <TextField
            select
            label="Autor"
            error={!!errors.autor}
            helperText={errors.autor || 'Seleccione un Autor'}
            size="small"
            value={autor?.id?.toString() || ''} 
            onChange={handleAutorChange}
            name="autor"
          >
            <MenuItem value="" disabled>
              Seleccione un Autor
            </MenuItem>
            {autores.map((autorItem) => (
              <MenuItem key={autorItem.id} value={autorItem.id.toString()}>
                {`${autorItem.nombre} ${autorItem.apellido} (${autorItem.idiomaNativo})`}
              </MenuItem>
            ))}
          </TextField>

          <Divider sx={{ borderColor: 'black', borderWidth: 0.5 }} />

          <TextField
            sx={{ width: '100%' }}
            required
            size="small"
            label="Ediciones"
            value={cantidadEdiciones}
            onChange={handleInputChange}
            name="cantidadEdiciones"
            error={!!errors.cantidadEdiciones}
            helperText={errors.cantidadEdiciones}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              sx={{ width: '45%' }}
              required
              size="small"
              label="Cantidad de páginas"
              value={cantidadPaginas}
              onChange={handleInputChange}
              name="cantidadPaginas"
              error={!!errors.cantidadPaginas}
              helperText={errors.cantidadPaginas}
            />

            <TextField
              sx={{ width: '45%' }}
              required
              size="small"
              label="Cantidad de palabras"
              value={cantidadPalabras}
              onChange={handleInputChange}
              name="cantidadPalabras"
              error={!!errors.cantidadPalabras}
              helperText={errors.cantidadPalabras}
            />
          </div>

          <TextField
            sx={{ width: '100%' }}
            required
            size="small"
            label="Ventas Semanales"
            value={ventasSemanales}
            onChange={handleInputChange}
            name="ventasSemanales"
          />

          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={lecturaCompleja}
                onChange={(e) => setLecturaCompleja(e.target.checked)}
              />
            }
            label="Lectura Compleja"
          />

          <Divider sx={{ borderColor: 'black', borderWidth: 0.5 }} />

          <Typography sx={{ fontWeight: '700' }}>Lenguaje original:</Typography>
          {autor && <Typography variant="body2">{idiomaNativo}</Typography>}

          <Typography variant="subtitle1" sx={{ fontWeight: '700' }}>
            Otros Idiomas:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {idiomas.map((lenguaje) => (
              <FormControlLabel
                key={lenguaje}
                control={
                  <Checkbox
                    checked={lenguajesTraduccion.includes(lenguaje)}
                    onChange={() => handleCheckboxChange(lenguaje)}
                  />
                }
                label={lenguaje}
              />
            ))}
          </Box>

          <Divider />

          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1rem',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{ borderColor: '#540b0e', backgroundColor: '#540b0e' }}
            >
              {id === 'new' ? 'Crear' : 'Guardar'}
            </Button>

            <Button
              onClick={volver}
              variant="outlined"
              sx={{ borderColor: '#540b0e', color: '#540b0e' }}
            >
              Cancelar
            </Button>
          </Box>

          <ConfirmDialog
            open={openDialog}
            title="Confirmación"
            message="¿Estás seguro de que quieres cancelar sin guardar los cambios?"
            onClose={handleDialogClose}
            onConfirm={handleConfirmCancel}
          />
        </Box>
      </Box>
    </>
  )
}

export default EdicionLibros

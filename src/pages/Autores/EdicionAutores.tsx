import { Box, TextField, Typography, Button, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { autorService } from '../../services/autorService'
import { useOnInit } from '../../HookCustom'
import { AutorEdit } from '../../domain/autorEdit'
import { useSnackbar } from 'notistack'
import { ErrorResponse, handleError } from '../../utils/error-handler'
import ConfirmDialog from '../../components/confirmDialog'
import { lenguajeService } from '../../services/lenguajeService'

type Props = {
  setTitulo: React.Dispatch<React.SetStateAction<string>>
  readOnly: boolean
}

const EdicionAutores = ({ setTitulo, readOnly }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [nombre, setNombre] = useState<string>('')
  const [apellido, setApellido] = useState<string>('')
  const [idiomaNativo, setIdiomaNativo] = useState<string>('')
  const [huboCambios, setHuboCambios] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [errors, setErrors] = useState({
    nombre: '',
    apellido: '',
    idiomaNativo: '',
  })
  const [idiomas, setIdiomas] = useState<string[]>([])

  const changeTitulo = () => {
    if (readOnly) {
      setTitulo('Detalle Autor')
    } else {
      setTitulo('Edicion Autores')
    }
  }

  const traerAutor = async () => {
    changeTitulo()
    console.log(readOnly)
    if (id !== 'new') {
      try {
        const autorData = await autorService.getAutorById(Number(id))
        setNombre(autorData.nombre)
        setApellido(autorData.apellido)
        setIdiomaNativo(autorData.idiomaNativo)
      } catch (error) {
        handleError(error as ErrorResponse, enqueueSnackbar)
        navigate('/autores')
      }
    }
  }
  useOnInit(() => {
    traerAutor()
    traerIdiomas()
  })

  const validate = () => {
    const tempErrors = { nombre: '', apellido: '', idiomaNativo: '' }
    if (!nombre) tempErrors.nombre = 'El nombre es requerido'
    if (!apellido) tempErrors.apellido = 'El apellido es requerido'
    if (!idiomaNativo) tempErrors.idiomaNativo = 'El idioma es requerido'
    setErrors(tempErrors)
    return Object.values(tempErrors).every((x) => x === '')
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const autorEdit: AutorEdit = {
      nombre: nombre,
      apellido: apellido,
      idiomaNativo: idiomaNativo,
    }

    if (!validate()) {
      enqueueSnackbar('Por favor, complete todos los campos requeridos', {
        variant: 'error',
      })
      return
    }

    try {
      if (id === 'new') {
        await autorService.createAutor(autorEdit)
        enqueueSnackbar('Autor creado con éxito', { variant: 'success' })
      } else {
        await autorService.edicionAutor(Number(id), autorEdit)
        enqueueSnackbar('Autor actualizado con éxito', { variant: 'success' })
      }
      navigate('/autores')
    } catch (error) {
      handleError(error as ErrorResponse, enqueueSnackbar)
    }
  }

  const volver = () => {
    if (huboCambios) {
      setOpenDialog(true)
    } else {
      navigate('/autores')
    }
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
  }

  const handleConfirmCancel = () => {
    setOpenDialog(false)
    navigate('/autores')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Marcar como "sucio" cuando el usuario realice cambios
    setHuboCambios(true)
    if (e.target.name === 'nombre') {
      setNombre(e.target.value)
    } else if (e.target.name === 'apellido') {
      setApellido(e.target.value)
    } else if (e.target.name === 'idioma') {
      setIdiomaNativo(e.target.value)
    }
  }

  const traerIdiomas = async () => {
    try {
      const idiomasData = await lenguajeService.getLenguajes()
      setIdiomas(idiomasData)
    } catch (error) {
      handleError(error as ErrorResponse, enqueueSnackbar)
    }
  }

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ fontWeight: '700', margin: '0.5rem', marginBottom: '1rem' }}
      >
        {readOnly
          ? 'Detalle Autor'
          : id === 'new'
          ? 'Crear Autor'
          : 'Editar Autor'}
      </Typography>

      <Box
        component="form"
        sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
      >
        <TextField
          sx={{ width: '100%' }}
          required
          value={nombre}
          onChange={handleInputChange}
          size="small"
          label="Nombre"
          name="nombre"
          error={!!errors.nombre}
          helperText={errors.nombre || 'Ingrese el nombre del autor'}
          InputProps={{
            readOnly: readOnly,
          }}
          data-testid="nombre"
        />
        <TextField
          sx={{ width: '100%' }}
          required
          value={apellido}
          onChange={handleInputChange}
          size="small"
          label="Apellido"
          name="apellido"
          error={!!errors.apellido}
          helperText={errors.apellido || 'Ingrese el apellido del autor'}
          InputProps={{
            readOnly: readOnly,
          }}
          data-testid="apellido"
        />
        <TextField
          select
          label="Idioma"
          value={idiomaNativo}
          onChange={handleInputChange}
          helperText="Seleccione un Idioma"
          size="small"
          name="idioma"
          error={!!errors.idiomaNativo}
          InputProps={{
            readOnly: readOnly,
          }}
          data-testid="idioma"
        >
          {idiomas.map((lenguage) => (
            <MenuItem key={lenguage} value={lenguage}>
              {lenguage}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem',
          justifyContent: 'flex-end',
        }}
      >
        {!readOnly && (
          <Button
            data-testid="submit"
            onClick={handleSubmit}
            variant="contained"
            sx={{ borderColor: '#540b0e', backgroundColor: '#540b0e' }}
          >
            {id === 'new' ? 'Crear' : 'Guardar'}
          </Button>
        )}

        <Button
          onClick={volver}
          variant="outlined"
          sx={{ borderColor: '#540b0e', color: '#540b0e' }}
        >
          Volver
        </Button>
      </Box>

      {/* Confirmación de cancelación */}
      <ConfirmDialog
        open={openDialog}
        title="Confirmación"
        message="¿Estás seguro de que quieres cancelar sin guardar los cambios?"
        onClose={handleDialogClose}
        onConfirm={handleConfirmCancel}
      />
    </Box>
  )
}

export default EdicionAutores

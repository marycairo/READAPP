const BAD_REQUEST = 400
const NOT_FOUND = 404
const INTERNAL_SERVER_ERROR = 500
const NOT_CONNECTED = 0

export type ErrorResponse = {
  response?: {
    status?: number
    data?: {
      message: string
    }
  }
}

export const handleError = (
  error: ErrorResponse,
  enqueueSnackbar: (message: string, options?: object) => void,
) => {
  const status = error.response?.status ?? 0
  const serverMessage = error.response?.data?.message
  let errorMessage = serverMessage || ''

  if (!errorMessage) {
    if (status >= INTERNAL_SERVER_ERROR) {
      errorMessage = 'Ocurrió un error. Consulte al administrador del sistema'
      console.error(error) // Log para errores de servidor
    } else if (status === NOT_FOUND) {
      errorMessage = 'El recurso no ha sido encontrado.'
    } else if (status >= BAD_REQUEST) {
      errorMessage =
        'Error en la solicitud. Verifique los datos e intente nuevamente.'
    } else if (status === NOT_CONNECTED) {
      errorMessage = 'No se pudo conectar con el servidor.'
    } else {
      errorMessage = 'Error desconocido.'
    }
  }

  enqueueSnackbar(errorMessage, { variant: 'error' })
}

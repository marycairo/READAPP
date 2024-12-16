import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import EdicionAutores from './EdicionAutores'
import { autorService } from '../../services/autorService'
import { vi } from 'vitest'
import { crearAutor } from '../../utils/autoresUtilTest'

const mockedNavigation = vi.fn()
vi.mock('react-router-dom', async () => {
  const mockedRouter = await vi.importActual('react-router-dom')
  return {
    ...mockedRouter,
    useNavigate: () => mockedNavigation,
  }
})

const mockAutorEdit = crearAutor('Gabriel', 'Garcia Marquez', 'INGLES')

describe('Edicion Autores Test', () => {
  beforeEach(() => {
    vi.spyOn(autorService, 'getAutorById').mockResolvedValue(mockAutorEdit)
  })

  test('Debe renderizar correctamente el form de edicion', async () => {
    render(
      <Router>
        <SnackbarProvider>
          <EdicionAutores setTitulo={vi.fn()} readOnly={false} />
        </SnackbarProvider>
      </Router>,
    )

    expect(screen.getByTestId('nombre')).toBeTruthy()
    expect(screen.getByTestId('apellido')).toBeTruthy()
    expect(screen.getByTestId('idioma')).toBeTruthy()
  })

  test('Debe mostrar errores de validación al enviar con campos vacíos', async () => {
    render(
      <Router>
        <SnackbarProvider>
          <EdicionAutores setTitulo={vi.fn()} readOnly={false} />
        </SnackbarProvider>
      </Router>,
    )

    fireEvent.click(screen.getByTestId('submit'))

    //para esperar que los cambios se reflejen en el DOM
    await waitFor(() => {
      expect(screen.findByText('El nombre es requerido')).resolves.toBeTruthy()
      expect(
        screen.findByText('El apellido es requerido'),
      ).resolves.toBeTruthy()
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })
  })
})

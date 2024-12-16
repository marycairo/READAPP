import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { crearAutor } from '../../utils/autoresUtilTest'
import AutorCard from '../../components/cardAutores/AutorCard'
import { Autor } from '../../domain/autor'

const mockedNavigation = vi.fn()

vi.mock('react-router-dom', async () => {
  const mockedRouter = await vi.importActual('react-router-dom')
  return {
    ...mockedRouter,
    useNavigate: () => mockedNavigation,
  }
})

describe('Autores Card', () => {
  describe('Las acciones de la card funcionan', () => {
    let autorAsignado: Autor
    beforeEach(() => {
      autorAsignado = crearAutor(
        1,
        'Juan',
        'Perez',
        30,
        true,
        'Español',
        'Juanito',
      )
    })
    test('Si cliquea en editar, se redirije a edicion', async () => {
      render(
        <BrowserRouter>
          <AutorCard autor={autorAsignado} actualizar={vi.fn()} />
        </BrowserRouter>,
      )
      await userEvent.click(
        screen.getByTestId('accionEditar_' + autorAsignado.id),
      )
      expect(mockedNavigation).toHaveBeenCalledWith(
        `/edicionautor/${autorAsignado.id}`,
      )
    })
    test('Si cliquea en eliminar, se abre el dialogo', async () => {
      render(
        <BrowserRouter>
          <AutorCard autor={autorAsignado} actualizar={vi.fn()} />
        </BrowserRouter>,
      )
      await userEvent.click(
        screen.getByTestId('accionDelete_' + autorAsignado.id),
      )
      expect(screen.findByTestId('accionDelete-Dialog_'+ autorAsignado.id)).toBeTruthy()
    })
    test ('Si cliquea en eliminar y luego en cancelar, se cierra el dialogo', async () => {
      render(
        <BrowserRouter>
          <AutorCard autor={autorAsignado} actualizar={vi.fn()} />
        </BrowserRouter>,
      )
      await userEvent.click(
        screen.getByTestId('accionDelete_' + autorAsignado.id),
      )
      await userEvent.click(
        screen.getByText('Cancelar')
      )
      expect(screen.queryByTestId('accionDelete-Dialog_'+ autorAsignado.id)).toBeNull()
    })
  })
})

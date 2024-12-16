import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Libro } from '../../../domain/libro'
import { crearLibro } from '../../../utils/librosUtilTest'
import LibroCard from './LibroCard'

const mockedNavigation = vi.fn()

vi.mock('react-router-dom', async () => {
  const mockedRouter = await vi.importActual('react-router-dom')
  return {
    ...mockedRouter,
    useNavigate: () => mockedNavigation,
  }
})

describe('Libros Card', () => {
  describe('Las acciones de la card funcionan', () => {
    let libroAsignado: Libro
    beforeEach(() => {
      libroAsignado = crearLibro(
        1,
        'Bajo la misma estrella',
        300,
        50,
        20,
        5,
        1,
        'lewis',
        ['Ingles'],
        ['Ingles'],
        true
      )
    })
    test('Si cliquea en editar, se redirije a edicion', async () => {
      render(
        <BrowserRouter>
          <LibroCard libro={libroAsignado} actualizar={vi.fn()} />
        </BrowserRouter>,
      )
      await userEvent.click(
        screen.getByTestId('accionEditar_' + libroAsignado.id),
      )
      expect(mockedNavigation).toHaveBeenCalledWith(
        `/edicionlibro/${libroAsignado.id}`,
      )
    })
    test('Si cliquea en eliminar, se abre el dialogo', async () => {
      render(
        <BrowserRouter>
          <LibroCard libro={libroAsignado} actualizar={vi.fn()} />
        </BrowserRouter>,
      )
      await userEvent.click(
        screen.getByTestId('accionDelete_' + libroAsignado.id),
      )
      expect(screen.findByTestId('accionDelete-Dialog_'+ libroAsignado.id)).toBeTruthy()
    })
    test ('Si cliquea en eliminar y luego en cancelar, se cierra el dialogo', async () => {
      render(
        <BrowserRouter>
          <LibroCard libro={libroAsignado} actualizar={vi.fn()} />
        </BrowserRouter>,
      )
      await userEvent.click(
        screen.getByTestId('accionDelete_' + libroAsignado.id),
      )
      await userEvent.click(
        screen.getByText('Cancelar')
      )
      expect(screen.queryByTestId('accionDelete-Dialog_'+ libroAsignado.id)).toBeNull()
    })
  })
})

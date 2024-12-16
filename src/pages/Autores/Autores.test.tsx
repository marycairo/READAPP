import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import Autores from './Autores'
import {autorService} from '../../services/autorService'
import { crearAutor } from '../../utils/autoresUtilTest'

const mockedAutores = [
    crearAutor(1, 'Juan', 'Perez', 30, true, 'Español', 'Juanito'),
    crearAutor(2, 'Pedro', 'Gomez', 40, false, 'Ingles', 'Pedrito')
]

describe('Autores Test', () => {

    beforeEach(() => {
        vi.spyOn(autorService, 'getAutoresFilter').mockResolvedValue(mockedAutores)
    })
    describe('El servicio Responde para traer autores', () => {
        test('Debe renderizar correctamente todo', async () => {
            render(<BrowserRouter><Autores setTitulo={vi.fn()} /></BrowserRouter>)
            expect(await screen.findByTestId('autor-card-1')).toBeTruthy()
            expect(await screen.findByTestId('autor-card-2')).toBeTruthy()
        })
    })
    afterEach(() => {
        vi.restoreAllMocks()
    })

})
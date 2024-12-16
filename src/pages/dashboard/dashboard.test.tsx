import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { dashboardService } from '../../services/dashboardService'
import userEvent from '@testing-library/user-event'
import Dashboard from './dashboard'

const mockedInfoCard = {
    Libros: 10,
    Recomendaciones: 30,
    'Centros de Lectura': 10,
    'Usuarios Totales': 10,
}
const mockedNavigation = vi.fn()
vi.mock('react-router-dom', async () => {
    const mockedRouter = await vi.importActual('react-router-dom')
    return {
        ...mockedRouter,
        useNavigate: () => mockedNavigation,
    }
})

describe('Dashboard test', () => {

    beforeEach(() => {
        vi.spyOn(dashboardService, 'getInfoCard').mockResolvedValue(mockedInfoCard)
        vi.spyOn(dashboardService, 'deleteUsersInactive').mockResolvedValue()
        vi.spyOn(dashboardService, 'deleteCentrosLectura').mockResolvedValue()
    })

    describe("Se trae la info de las cards", () => {
        test('Renderiza correctamente las cards', async () => {
            render(<BrowserRouter><Dashboard setTitulo={vi.fn()} /></BrowserRouter>)
            expect(await screen.findByTestId('infoCard-Libros')).toBeTruthy()
            expect(await screen.findByTestId('infoCard-Recomendaciones')).toBeTruthy()
            expect(await screen.findByTestId('infoCard-Centros de Lectura')).toBeTruthy()
            expect(await screen.findByTestId('infoCard-Usuarios Totales')).toBeTruthy()
        })
    })

    describe("Acciones de la vista", () => {
        test('Se eliminan los usuarios inactivos', async () => {
            render(<BrowserRouter><Dashboard setTitulo={vi.fn()} /></BrowserRouter>)
            await userEvent.click(screen.getByTestId('InactiveDeleteUser'))
            expect(dashboardService.deleteUsersInactive).toHaveBeenCalled()
        })
        test ('Se eliminan los centros de lectura inactivos', async () => {
            render(<BrowserRouter><Dashboard setTitulo={vi.fn()} /></BrowserRouter>)
            await userEvent.click(screen.getByTestId('InactiveDeleteCenter'))
            expect(dashboardService.deleteCentrosLectura).toHaveBeenCalled()
        })
    })
    afterEach(() => {
        vi.restoreAllMocks()
    })


})
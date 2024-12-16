/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'

const mockedNavigation = vi.fn()
vi.mock('react-router-dom', async () => {
  const mockedRouter = await vi.importActual('react-router-dom')
  return {
    ...mockedRouter,
    useNavigate: () => mockedNavigation,
  }
})

describe('Login Component', () => {

  test('Debe renderizar el formulario de login correctamente', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const userNameField = await screen.findByLabelText(/usuario/i)
    const passwordField = await screen.findByLabelText(/contraseña/i)
    const submitButton = await screen.findByRole('button', { name: /ingresar/i })

    expect(userNameField).toBeTruthy()  
    expect(passwordField).toBeTruthy()  
    expect(submitButton).toBeTruthy()  
  })

  test('Debe mostrar error cuando el formulario tiene campos vacíos', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const submitButton = await screen.findByRole('button', { name: /ingresar/i })
    
    fireEvent.click(submitButton)

    const userNameError = screen.queryByText(/el nombre de usuario es obligatorio/i)
    const passwordError = screen.queryByText(/la contraseña es obligatoria/i)

    expect(userNameError).toBeTruthy()
    expect(passwordError).toBeTruthy()
  })
})

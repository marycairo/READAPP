import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Dashboard from './pages/dashboard/dashboard'
import Autores from './pages/Autores/Autores'
import Libros from './pages/Libros/Libros'
import EdicionAutores from './pages/Autores/EdicionAutores'
import EdicionLibros from './pages/Libros/EdicionLibros'
import Login from './pages/Login/Login'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { useState } from 'react'

export const ReadAppRoutes = () => {
  const [titulo, setTitulo] = useState<string>('')
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <>
              <Header titulo={titulo} />

              <div style={{ margin: '1rem', paddingBottom: '7rem' }}>
                <Routes>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route
                    path="/dashboard"
                    element={<Dashboard setTitulo={setTitulo} />}
                  />
                  <Route
                    path="/libros"
                    element={<Libros setTitulo={setTitulo} />}
                  />
                  <Route
                    path="/autores"
                    element={<Autores setTitulo={setTitulo} />}
                  />
                  <Route
                    path="/edicionautor/:id"
                    element={
                      <EdicionAutores setTitulo={setTitulo} readOnly={false} />
                    }
                  />
                  <Route
                    path="/detalleautor/:id"
                    element={
                      <EdicionAutores setTitulo={setTitulo} readOnly={true} />
                    }
                  />
                  <Route
                    path="/edicionlibro/:id"
                    element={<EdicionLibros setTitulo={setTitulo} />}
                  />
                </Routes>
              </div>

              <Footer />
            </>
          }
        />
      </Routes>
    </>
  )
}

export const ReadAppRouter = () => (
  <Router>
    <ReadAppRoutes />
  </Router>
)

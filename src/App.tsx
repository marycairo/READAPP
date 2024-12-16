import { VerticalAlignTop } from '@mui/icons-material'
import './App.css'
import { ReadAppRouter } from './routes'
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <ReadAppRouter />
      </SnackbarProvider>
    </>
  )
}

export default App

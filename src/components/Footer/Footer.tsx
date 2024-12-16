import * as React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import BarChartIcon from '@mui/icons-material/BarChart'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import PortraitIcon from '@mui/icons-material/Portrait'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import Paper from '@mui/material/Paper'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../services/authService'
import ConfirmDialog from '../confirmDialog'


const Footer = () => {
  const [value, setValue] = React.useState('recents')
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleOpenDialog = () => {
    setOpen(true) 
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    logout() 
    navigate('/login') 
    handleCloseDialog() 
  }

  return (
    <>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          sx={{ width: 390 }}
          value={value}
          onChange={handleChange}
          className="header"
        >
          <BottomNavigationAction
            sx={{ color: 'white', '&.Mui-selected': { color: '#e6ccb2' } }}
            label="Dashboard"
            value="dashboard"
            icon={<BarChartIcon />}
            component={Link}
            to="/dashboard"
          />
          <BottomNavigationAction
            sx={{ color: 'white', '&.Mui-selected': { color: '#e6ccb2' } }}
            label="Books"
            value="books"
            icon={<MenuBookIcon />}
            component={Link}
            to="/libros"
          />
          <BottomNavigationAction
            sx={{ color: 'white', '&.Mui-selected': { color: '#e6ccb2' } }}
            label="Authors"
            value="author"
            icon={<PortraitIcon />}
            component={Link}
            to="/autores"
          />
          <BottomNavigationAction
            sx={{ color: 'white', '&.Mui-selected': { color: '#e6ccb2' } }}
            label="Exit"
            value="exitApp"
            icon={<ExitToAppIcon />}
            onClick={handleOpenDialog}
          />
        </BottomNavigation>
      </Paper>

      <ConfirmDialog
        open={open}
        title="Cierre de sesión"
        message="¿Estás seguro de que deseas cerrar sesión?"
        onClose={handleCloseDialog} 
        onConfirm={handleLogout} 
      />
    </>
  )
}

export default Footer

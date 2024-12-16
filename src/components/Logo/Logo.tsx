import './Logo.css'
import { Box } from '@mui/material'

export const Logo = () => {
  return (
    <Box className="logo">
      <h1>
        <img src="assets/icons/book.svg" alt="Ícono ReadApp" className="logo-icon" />
        ReadApp
      </h1>
    </Box>
  )
}
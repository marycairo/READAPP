import { Box } from '@mui/material'
import { iconsDashboard } from './iconsDash'
import './cardDash.css'

type Props = {
 nombre: string,
 valor: number
}

const CardDash = ({ nombre, valor }: Props) => {
  return (
    <Box className="card-board" data-testid={'infoCard-'+ nombre}>
      <div className='icon' >
        <>{iconsDashboard[nombre as keyof typeof iconsDashboard]}</>
      </div>
      <div className='info'>
          <h3>{nombre}</h3>
          <p className='cant'>{valor}</p>
      </div>
    </Box>
  )
}

export default CardDash

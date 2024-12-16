import { Book } from '@phosphor-icons/react'
import './Header.css'

type Props = {
  titulo: string
}

const Header = ({ titulo }: Props) => {
  return (
    <header className="header">
      <div className="header__icon__container">
        <Book size={40} />
        <h1 className="header__icon">ReadApp / {titulo}</h1>
      </div>
    </header>
  )
}

export default Header

import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { CustomFilter } from '../../domain/filterText/customFilter';
import { IconButton } from '@mui/material';

type Props ={
  cargarFiltro: (texto: string) => void
}


const SearchBar = ({cargarFiltro}:Props) => {
  // const SearchIconWrapper = styled('div')(({ theme }) => ({
  //   padding: theme.spacing(0, 1),
  //   height: '100%',
  //   position: 'absolute',
  //   right: 0, 
  //   top: 0,
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#540b0e', 
  //   color: 'white',
  //   borderTopRightRadius: "1rem", 
  //   borderBottomRightRadius: "1rem"
  // }));

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "1rem",
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(1)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const filter = new CustomFilter()
  const actualizarFiltro= (texto : string) => {
    filter.palabraClave = texto
  }
  const dieronClick = () => {
    console.log("hola")
    cargarFiltro(filter.palabraClave)
  }
  return (
    <Search>
      <StyledInputBase
        className='search-input'
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => actualizarFiltro(e.target.value)}
      />
      <IconButton className="search-button" onClick={dieronClick} >
        <SearchIcon />
      </IconButton>
    </Search>
  );
};

export default SearchBar;

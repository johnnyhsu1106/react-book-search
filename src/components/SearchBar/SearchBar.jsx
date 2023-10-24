import Container from '../shared/Container';
import SearchInput from './SearchInput';
import ClearSearchBtn from './ClearSearchBtn';


const SearchBar = () => {

  return (
    <Container className='search-bar'>
      <SearchInput />
      <ClearSearchBtn />
    </Container>
  )
}

export default SearchBar
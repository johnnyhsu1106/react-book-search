import Container from './components/shared/Container';
import SearchBar from './components/SearchBar/SearchBar';
import BookList from './components/BookList/BookList';
import { BooksProvider } from './context/BooksContext';
import './App.css';


const App = () => {
  return (
    <Container className='container'>
      <BooksProvider>
        <SearchBar />
        <BookList />
      </BooksProvider>
    </Container>
  )
}

export default App 

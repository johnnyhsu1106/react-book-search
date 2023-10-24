import Book from './Book';
import Container from '../shared/Container';
import { useBooksContext } from '../../context/BooksContext';


const BookList = () => {
  const {
    books,
    isLoading,
    isError,  
  } = useBooksContext();


  return (
    <Container className='books'>
      {books.map((book, index) => {
        const isLastBook = books.length === index + 1;
        return (
          <Book
            key={index} 
            book={book}
            isLastBook={isLastBook}
          />
        )
      })}
      {isLoading ? <p>Loading...</p> : null}
      {isError ? <p>Something goes wrong</p> : null}
    </Container>
  )
}

export default BookList;
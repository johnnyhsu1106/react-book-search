import { useBooksContext } from '../../context/BooksContext';


const Book = ({
  book,
  isLastBook
}) => {
  const { lastBookRef } = useBooksContext();
  const authors = book.authors?.join(', ') || '';

  if (isLastBook) {
    return (
      <div className='book' ref={lastBookRef}>
        <p className='title'><cite>{book.title}</cite></p>
        <p className='author'>by {authors}</p> 
      </div>
    );
  }
  
  return (
    <div className='book'>
      <p className='title'><cite>{book.title}</cite></p>
      <p className='authors'>by {authors}</p> 
    </div>
  )
}

export default Book;

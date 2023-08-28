import Loading from './Loading';
import Error from './Error';

const SearchResults = ({
  isLoading,
  hasError, 
  books, 
  lastSearchResultRef 
}) => {

  if (isLoading) {
    return <Loading isLoading={isLoading} />
  }

  if (hasError) {
    return <Error hasError={hasError} />
  }

  
  return (
    <ul>
    {books.map((book, index) => {
      if (books.length === index + 1) {
        return <li ref={lastSearchResultRef} key={book}>{book}</li>;
      }
      return <li key={book}>{book}</li>
    })}
    </ul>
  )
}

export default SearchResults;
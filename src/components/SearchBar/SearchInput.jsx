import { useEffect, useRef } from 'react';
import { useBooksContext } from '../../context/BooksContext'

const SearchInput = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  const {
    query,
    handleBooksSearch,
  } = useBooksContext();

  return (
    <input 
      className='search-input'
      type="text"
      placeholder='Search Book by Title'
      value={query}
      ref={inputRef}
      onChange={(e) => { handleBooksSearch(e.target.value) }} 
  />
  )
};

export default SearchInput;

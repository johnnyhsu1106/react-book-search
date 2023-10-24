import { createContext, useContext, useState, useRef, useCallback } from 'react';
import useBooksSearch from '../hooks/useBookSearch';


const BooksContext = createContext(null);

const useBooksContext = () => {
  const booksContext = useContext(BooksContext);
  
  if (booksContext === null) {
    throw new Error('useBookContext must be used within BookProvider');
  }
  return booksContext;
};


const BooksProvider = ({
  children
}) => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const { 
    books, 
    isLoading, 
    isError, 
    hasMore
  } = useBooksSearch(query, pageNumber);

  const observer = useRef();
  const lastBookRef = useCallback((node) => {
    if (isLoading) {
      return;
    }

    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => {
          return prevPageNumber + 1;
        });
      }
    });

    if (node) {
      observer.current.observe(node)
    }

  }, [isLoading, hasMore]);


  const handleBooksSearch = (inputValue) => {
    setQuery(inputValue);
    setPageNumber(1);
  };

  const handleSearchClear = () => {
    setQuery('');
  };

  const value = {
    query,
    books,
    pageNumber,
    isLoading,
    isError,
    hasMore,
    lastBookRef,
    handleBooksSearch,
    handleSearchClear
  };
  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  )
}

export { useBooksContext, BooksProvider };

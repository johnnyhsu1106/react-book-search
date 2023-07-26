import { useState, useRef, useCallback } from 'react'
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Loading from './Loading';
import Error from './Error';

import useBookSearch from './useBookSearch';

import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const { books, isLoading, hasError, hasMore } = useBookSearch(query, pageNumber);

  const observer = useRef();
  const lastSearchResultRef = useCallback(node => {
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


  const handleInputSearch = (inputValue) => {
    setQuery(inputValue);
    setPageNumber(1);
  };
  return (
    <> <h1>Search Books</h1>
      <SearchBar onChangeQuery={handleInputSearch}/>
      <SearchResults books={books} lastSearchResultRef={lastSearchResultRef}/>
      <Loading isLoading={isLoading} />
      <Error hasError={hasError} />   
    </>
    
  )
}

export default App 
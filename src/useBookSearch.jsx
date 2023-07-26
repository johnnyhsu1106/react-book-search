import { useEffect, useState } from 'react'

const useBookSearch = (query, pageNumber) => {
  const [books, setBooks] =  useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hasMore, setHasMore] = useState(false);



  useEffect(() => {
    setBooks([]);
  }, [query])

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    
    setIsLoading(true);
    setHasError(false);

    fetch(`https://openlibrary.org/search.json?q=${query}&page=${pageNumber}`, { signal })
      .then((res) => {
        if (!res.ok) {
          throw Error('Invalid HTTPs Request');
        }
        return res.json();

      }).then((data) => {
        const { docs } = data;

        setIsLoading(false);
        setHasMore(docs.length > 0);
        setBooks((prevBooks) => {
          return [...new Set([...prevBooks, ...docs.map((doc) => { return doc.title })])]
        });

      }).catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
        setHasError(true);
        console.error(err); 
      });

    return () => {
      controller.abort() 
    }
  }, [query, pageNumber]);

  return { books, isLoading, hasError, hasMore };
}

export default useBookSearch;
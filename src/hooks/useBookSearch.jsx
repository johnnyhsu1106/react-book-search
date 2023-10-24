import { useEffect, useState } from 'react'
const API_ENDPOINT = 'https://openlibrary.org/search.json';

const useBooksSearch = (query, pageNumber) => {
  const [books, setBooks] =  useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }
    setBooks([]);
  }, [query]);

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }

    const controller = new AbortController();

    const fetchBooks = async () => {  
      setIsLoading(true);
      setIsError(false);
      
      try {
        const res = await fetch(
          `${API_ENDPOINT}?q=${query}&page=${pageNumber}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error('Invalid HTTPs Request');
        }
        const data = await res.json();

        setHasMore(data?.docs.length > 0);
        setBooks((prevBooks) => {
          const newBooks = data?.docs.map((doc) => { return { title: doc.title, authors: doc.author_name }});
          return [...prevBooks, ...newBooks];
        });

      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();

    return () => {
      controller.abort() 
    }
  }, [query, pageNumber]);

  return { books, isLoading, isError, hasMore };
};

export default useBooksSearch;
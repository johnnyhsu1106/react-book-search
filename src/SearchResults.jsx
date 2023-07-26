import React from 'react'

const SearchResults = ({ books, lastSearchResultRef }) => {
  
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
import React from 'react'

const SearchBar = ( {query, onChangeQuery }) => {
  return (
    <input 
      className='search-bar'
      type="text"
      value={query}
      onChange={(e) => { onChangeQuery(e.target.value) }} 
    />
  )
}

export default SearchBar
import React from 'react'

const Error = ( { hasError }) => {
  return (
    hasError ? <p>Something goes wrong</p> : null
  );
}

export default Error
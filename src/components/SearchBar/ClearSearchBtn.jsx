import { useBooksContext } from '../../context/BooksContext';
import Button from '../shared/Button';

const ClearSearchBtn = () => {
  const { 
    query,
    handleSearchClear
   } = useBooksContext();
  
   const hasQuery = query.trim() !== '';

  if (!hasQuery) {
    return null;
  }
  return (
    <Button
      className='search-delete-btn'
      onClick={handleSearchClear}
    >
      &times;
    </Button>
  )
}

export default ClearSearchBtn;

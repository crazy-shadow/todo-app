import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/tasksSlice';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search tasks by title..."
      onChange={handleSearchChange}
      className='search-bar'
    />
  );
};

export default SearchBar;

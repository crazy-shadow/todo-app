import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchBar from '../components/SearchBar';
import { setSearchQuery } from '../store/tasksSlice';

const mockStore = configureStore([]);
jest.mock('../store/tasksSlice', () => ({
  ...jest.requireActual('../store/tasksSlice'),
  setSearchQuery: jest.fn(),
}));

describe('SearchBar', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it('renders the search input field', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    expect(getByPlaceholderText('Search tasks by title...')).toBeInTheDocument();
  });

  it('dispatches setSearchQuery action with the correct value when input changes', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const searchInput = getByPlaceholderText('Search tasks by title...') as HTMLInputElement;
    searchInput.value = 'New Task'; // Manually set the input value
    searchInput.dispatchEvent(new Event('input')); // Trigger input event to dispatch action

    expect(store.dispatch).toHaveBeenCalledWith(setSearchQuery('New Task'));
  });
});

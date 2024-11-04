import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TaskList from '../components/TaskList';
import { RootState } from '../store';

const mockStore = configureStore([]);

describe('TaskList', () => {
  const tasks = [
    { id: '1', title: 'First Task', description: 'First task description', dueDate: '2024-11-06', status: 'Pending', isEditted: false },
    { id: '2', title: 'Second Task', description: 'Second task description', dueDate: '2024-11-07', status: 'In Progress', isEditted: false },
    { id: '3', title: 'Another Task', description: 'Another task description', dueDate: '2024-11-08', status: 'Completed', isEditted: false },
  ];

  let store: any;

  beforeEach(() => {
    const initialState: RootState = {
      tasks: {
        tasks,
        searchQuery: '',
      },
    };
    store = mockStore(initialState);
  });

  it('renders all tasks when there is no search query', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(getByText('First Task')).toBeInTheDocument();
    expect(getByText('Second Task')).toBeInTheDocument();
    expect(getByText('Another Task')).toBeInTheDocument();
  });

  it('renders only the tasks matching the search query', () => {
    store = mockStore({
      tasks: {
        tasks,
        searchQuery: 'Second',
      },
    });

    const { queryByText, getByText } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(getByText('Second Task')).toBeInTheDocument();
    expect(queryByText('First Task')).toBeNull();
    expect(queryByText('Another Task')).toBeNull();
  });

  it('renders no tasks when the search query does not match any task title', () => {
    store = mockStore({
      tasks: {
        tasks,
        searchQuery: 'Nonexistent',
      },
    });

    const { queryByText } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(queryByText('First Task')).toBeNull();
    expect(queryByText('Second Task')).toBeNull();
    expect(queryByText('Another Task')).toBeNull();
  });
});

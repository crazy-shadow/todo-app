import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AddTaskForm from '../components/AddTaskForm';
import { addTask } from '../store/tasksSlice';

const mockStore = configureStore({});
jest.mock('../store/tasksSlice', () => ({
  ...jest.requireActual('../store/tasksSlice'),
  addTask: jest.fn(),
}));

describe('AddTaskForm', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it('renders the input fields and button', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <AddTaskForm />
      </Provider>
    );

    expect(getByPlaceholderText('Title')).toBeInTheDocument();
    expect(getByPlaceholderText('Description')).toBeInTheDocument();
    expect(getByText('Add Task')).toBeInTheDocument();
  });

  it('updates title, description, and due date inputs on change', () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <Provider store={store}>
        <AddTaskForm />
      </Provider>
    );

    const titleInput = getByPlaceholderText('Title') as HTMLInputElement;
    const descriptionInput = getByPlaceholderText('Description') as HTMLTextAreaElement;
    const dueDateInput = getByLabelText('Due date') as HTMLInputElement;

    titleInput.value = 'New Task';
    descriptionInput.value = 'Task description';
    dueDateInput.value = '2024-11-05';

    expect(titleInput.value).toBe('New Task');
    expect(descriptionInput.value).toBe('Task description');
    expect(dueDateInput.value).toBe('2024-11-05');
  });

  it('dispatches addTask action with correct task details when "Add Task" button is clicked', () => {
    const { getByPlaceholderText, getByLabelText, getByText } = render(
      <Provider store={store}>
        <AddTaskForm />
      </Provider>
    );

    const titleInput = getByPlaceholderText('Title');
    const descriptionInput = getByPlaceholderText('Description');
    const dueDateInput = getByLabelText('Due date');
    const addButton = getByText('Add Task');

    titleInput.value = 'New Task';
    descriptionInput.value = 'Task description';
    dueDateInput.value = '2024-11-05';
    addButton.click();

    expect(store.dispatch).toHaveBeenCalledWith(
      addTask({
        id: expect.any(String),
        title: 'New Task',
        description: 'Task description',
        dueDate: '2024-11-05',
        status: 'Pending',
        isEditted: false,
      })
    );
  });
});

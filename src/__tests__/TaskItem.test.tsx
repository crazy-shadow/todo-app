import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { deleteTask, editTask } from '../store/tasksSlice';
import TaskItem from '../components/TaskItem';
import { Task } from '../types';

const mockStore = configureStore([]);
jest.mock('../store/tasksSlice', () => ({
  ...jest.requireActual('../store/tasksSlice'),
  deleteTask: jest.fn(),
  editTask: jest.fn(),
}));

describe('TaskItem', () => {
  let store: any;
  const task: Task = {
    id: '1',
    title: 'Sample Task',
    description: 'This is a sample task description',
    dueDate: '2024-11-02',
    status: 'Pending',
    isEditted: false,
  };

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it('renders task title, description, due date, and status', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TaskItem task={task} />
      </Provider>
    );

    expect(getByText(/title: Sample Task/i)).toBeInTheDocument();
    expect(getByText(/description: This is a sample task description/i)).toBeInTheDocument();
    expect(getByText(/Due Date: 2024-11-02/i)).toBeInTheDocument();
    expect(getByText(/Status: Pending/i)).toBeInTheDocument();
  });

  it('triggers deleteTask action when delete button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TaskItem task={task} />
      </Provider>
    );

    const deleteButton = getByText('Delete');
    userEvent.click(deleteButton);

    expect(store.dispatch).toHaveBeenCalledWith(deleteTask(task.id));
  });

  it('enables edit mode when edit button is clicked', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <TaskItem task={task} />
      </Provider>
    );

    const editButton = getByText('Edit');
    userEvent.click(editButton);

    expect(getByPlaceholderText('Title')).toHaveValue(task.title);
    expect(getByPlaceholderText('Description')).toHaveValue(task.description);
    expect(getByText('Pending')).toBeInTheDocument(); // Status dropdown should display "Pending"
  });

  it('triggers editTask action with updated values when save button is clicked', () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <Provider store={store}>
        <TaskItem task={{ ...task, isEditted: true }} />
      </Provider>
    );

    const titleInput = getByPlaceholderText('Title');
    const descriptionInput = getByPlaceholderText('Description');
    const statusSelect = getByDisplayValue('Pending');

    userEvent.clear(titleInput);
    userEvent.type(titleInput, 'Updated Task Title');
    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, 'Updated description');
    userEvent.selectOptions(statusSelect, 'Completed');

    const saveButton = getByText('Save');
    userEvent.click(saveButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      editTask({
        id: task.id,
        title: 'Updated Task Title',
        description: 'Updated description',
        dueDate: task.dueDate,
        status: 'Completed',
        isEditted: false,
      })
    );
  });

  it('highlights due date if task is past due', () => {
    const expiredTask = { ...task, dueDate: '2024-11-01' };

    const { getByText } = render(
      <Provider store={store}>
        <TaskItem task={expiredTask} />
      </Provider>
    );

    const dueDateElement = getByText(/Due Date: 2024-11-01/i);
    expect(dueDateElement).toHaveStyle('border: 1px solid red');
  });
});

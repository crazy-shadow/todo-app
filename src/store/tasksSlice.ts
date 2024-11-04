import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus } from '../types';

interface TasksState {
  tasks: Task[];
  searchQuery: string;
}

const initialState: TasksState = { tasks: [], searchQuery: '' };

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setTaskStatus: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) task.status = action.payload.status;
    }
  },
});

export const { addTask, editTask, deleteTask, setTaskStatus, setSearchQuery } = tasksSlice.actions;
export default tasksSlice.reducer;

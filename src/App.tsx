import React from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar'; 

const App: React.FC = () => (
  <div>
    <h1 className='title'>To-Do App</h1>
    <SearchBar />
    <AddTaskForm />
    <TaskList />
  </div>
);

export default App;

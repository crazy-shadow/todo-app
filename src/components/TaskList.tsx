import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { RootState } from '../store';

const TaskList: React.FC = () => {
  const { tasks, searchQuery } = useSelector((state: RootState) => ({
    tasks: state.tasks.tasks,
    searchQuery: state.tasks.searchQuery,
  }));

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='task-list-wrapper'>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;


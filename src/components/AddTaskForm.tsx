import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import { Task } from '../types';

const AddTaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      status: 'Pending',
      isEditted: false,
    };
    dispatch(addTask(newTask));
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <div className='add-task-wrapper'>
      <div>Add task with title and description</div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTaskForm;

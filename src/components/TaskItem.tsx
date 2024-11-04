import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask, setTaskStatus } from '../store/tasksSlice';
import { Task, TaskStatus } from '../types';
import onCompareDate from '../utils/compareDate';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { id, title, description, dueDate, status, isEditted } = task;
  console.log(dueDate);

  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);
  const [newDueDate, setNewDueDate] = useState<string>(dueDate);
  const [newStatus, setNewStatus] = useState<TaskStatus>(status);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const enableEdit = () => {
    const newTask: Task = {
        id,
        title,
        description,
        dueDate,
        status,
        isEditted: true,
      };
    dispatch(editTask(newTask));
  };

  const handleSaveEditted = () => {
    const edittedTask: Task = {
        id,
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate,
        status: newStatus,
        isEditted: false,
      };
    dispatch(editTask(edittedTask));
  };

  useEffect(() => {
    const dateToCompare = new Date(dueDate);
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const compareDate = new Date(dateToCompare.getFullYear(), dateToCompare.getMonth(), dateToCompare.getDate());
    setIsExpired(onCompareDate(today, compareDate));
  }, [dueDate]);

  return (
    <div>
      {!isEditted ? (
        <h3>title: {task.title}</h3>
      ) : (
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      )}
      {!isEditted ? (
        <p>description: {task.description}</p>
      ) : (
        <textarea
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      )}
      {!isEditted ? (
        <p style={ isExpired ? { border: '1px solid red' } : {} }>Due Date: {task.dueDate}</p>
      ) : (
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
        />
      )}
      {!isEditted ? (
        <>
          <p>Status: {task.status}</p>
          
        </>
      ) : (
          <select value={task.status} onChange={(e) => setNewStatus(e.target.value as TaskStatus)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
      )}
      <button onClick={handleDelete}>Delete</button>
      <button onClick={isEditted ? handleSaveEditted : enableEdit}>{isEditted ? 'Save' : 'Edit'}</button>
    </div>
  );
};

export default TaskItem;

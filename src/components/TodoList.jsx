import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, toggleComplete, deleteTask,startEditing,updateTask,updateTaskStatus }) {

  
  return (
    <ul className='wrapper_ul'>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          updateTask={updateTask}
          startEditing={startEditing}
          updateTaskStatus={updateTaskStatus}
        />
      ))}
    </ul>
  );
}

export default TodoList;

import React, { useState } from 'react';
import TodoForm from './TodoForm';

export default function Todo(props) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className='todo' key={props.todo.id}>
      {
        isEditing ?
        <TodoForm todo={props.todo} isEditing={isEditing} setIsEditing={setIsEditing} updateTodo={props.updateTodo}/> :
        <div className='todo-text' onClick={() => setIsEditing(true)}>
          {props.todo.text}
        </div>
      }
      <div className='todo-date'>created: {props.todo.date}</div>
      <div
        className='todo-done'
        onClick={() => props.removeTodo(props.todo.id)}>
        DONE
      </div>
    </div>
  );
}

import React, {useState, useEffect, useRef} from 'react';

export default function TodoForm(props) {
  const [todo, setTodo] = useState(props.isEditing ? props.todo : {
    id: 0,
    text: "",
    date: ""
  })
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus()
  })
  
  const getTodoId = () => {
    if (props.isEditing) {
      return props.todo.id
    } else {
      return props.todos.length === 0 ? 0 : props.todos[0].id + 1
    }
  }

  const handleChange = e => {
    const newDate = new Date().toLocaleString().slice(0, -3);
  
    setTodo({
      ...todo,
      id: getTodoId(),
      text: e.target.value,
      date: newDate
    });
  };

  // console.log(props)
  const handleSubmit = e => {
    e.preventDefault();

    if (props.isEditing) {
      props.updateTodo(todo)
      props.setIsEditing(false)
    } else {
      props.onSubmit(todo)
    }
  };
  
  return (
    <form className='todo-form todo-text' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Add a todo'
        className='todo-form-input'
        name='text'
        value={todo.text}
        onChange={handleChange}
        ref={inputRef}
      />
      <button className='todo-form-btn'>Save</button>
    </form>

  );
}


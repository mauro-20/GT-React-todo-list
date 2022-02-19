import React, { useState } from 'react';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [isTodoFormShown, setIsTodoFormShown] = useState(false);

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  const toggleTodoForm = () => {
    setIsTodoFormShown(prev => !prev);
  };

  const addTodo = todo => {
    // check if text not empty
    if (!todo.text) {
      return;
    }

    setTodos(prevTodos => [todo, ...prevTodos]);
    toggleTodoForm();
  };

  const updateTodo = (todoEdit) => {
    // check if text not empty
    if (!todoEdit.text) {
      return;
    }

    setTodos(prev => prev.map(todo => (
      todo.id === todoEdit.id ?
        {
          ...todo,
          text: todoEdit.text,
          date: todoEdit.date
        } : todo
    )));

  };


  const removeTodo = id => {
    const removeArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removeArr);
  };

  // <Todo todos={todos} removeTodo={removeTodo} updateTodoText={updateTodoText}/>

  return (
    <div className='app-container'>
      <button
        className='btn-addtodo'
        onClick={toggleTodoForm}
      ><span className='btn-addtodo-plus'>+</span> ADD A NEW TODO
      </button>
      <div className='todo-container'>
        {isTodoFormShown && <TodoForm onSubmit={addTodo} todos={todos} />}
        {todos.map((todo) => <Todo key={todo.id} todo={todo} onSubmit={addTodo} removeTodo={removeTodo} updateTodo={updateTodo} />)}
      </div>
    </div>
    );
}


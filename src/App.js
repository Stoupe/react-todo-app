import React, { useState, useEffect } from 'react';
import Todo from './Todo.js';

import uniqid from 'uniqid';
// const uniqid = require('uniqid');

import logo from './logo.svg';
import './App.css';

function App() {

  const emptyTodo = {
    "id":"0",
    "text":"",
    "everyday":false
  }

  const [todos, updateTodos] = useState([]);
  const [currentTodo, updateCurrentTodo] = useState({});
  // const [newTodo, updateNewTodo] = useState({});

  useEffect(() => {

    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;


    // Todo change to stream
    while ( i-- ) {
        values.push( JSON.parse(localStorage.getItem(keys[i])));
    }

    // JSON.parse(localStorage.getItem(keys)).forEach( v => values.push(v));

    updateTodos(values);

  }, []);


  const onAddition = () => {
    
  }


  const addTodo = (e) => {
    e.preventDefault();
    createTodo(currentTodo, true);
    updateCurrentTodo(emptyTodo);
  }

  const saveTodo = (todo) => {
    localStorage.setItem(todo.id, JSON.stringify(todo));
  }

  /**
   * Creates a todo with input from the create field
   * @param {ToDo Text} text 
   * @param {Everyday checkbox} everyday 
   */
  const createTodo = (text, everyday) => {
    const todo = {
      "id": uniqid(),
      "text": text,
      "everyday": everyday
    }

    //Update the todo list, add new todo on the end
    updateTodos(todos => [...todos, todo]);

    //save to localstorage
    saveTodo(todo);
    console.log(localStorage);
  }

  const updateInput = (e) => {

    //update with value of checkbox & text
    updateCurrentTodo(e.target.value);

  }

  const clearLocalStorage = () => {
    //Todo refresh list
    localStorage.clear();
    
    console.log(`local storage cleared`);
  }


  return (
    <div className="App">

      <form onSubmit={addTodo}>
        <input type="text" value={currentTodo.text} onChange={updateInput}/>
        <input type="checkbox" name="everyday" id="everyday-id"/>
        <button type="submit">add</button>
      </form>

      {
      todos.map((todo) => (
        <Todo key={todo.id} todoObj={todo} />
      ))
      }

      <button onClick={clearLocalStorage}>Clear Local Storage</button>

    </div>
  );
}

export default App;

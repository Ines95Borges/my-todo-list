import React from 'react';
import {BsPlusSquareFill} from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

const Form = ({inputText, setInputText, todos, setTodos, setStatus}) => {
  const handleInputText = (e) => {
    setInputText(e.target.value);
  }

  const submitInputHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos, {text: inputText, completed: false, id:uuidv4()}
    ])
    setInputText("");
  }

  const statusHandler = (e) => {
    setStatus(e.target.value);
  }

  return(
    <form>
      <input value={inputText} type="text" name="todo-text" id="todo-text" onChange={handleInputText}/>
      <BsPlusSquareFill id="plus-sign" size={45} onClick={submitInputHandler}/>
      <select onChange={statusHandler} name="options" id="options">
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Uncompleted">Uncompleted</option>
      </select>
    </form>
  )
}

export default Form;
import React from 'react';
import {BsCheck, BsTrashFill} from 'react-icons/bs';
import {FaUndo} from 'react-icons/fa';

const Todo = ({text, todos, setTodos, todo}) => {
  const deleteHandler = () => {
    setTodos(todos.filter(el => el.id !== todo.id ));
  }

  const checkHandler = () => {
    setTodos(todos.map(item => {
      if(item.id === todo.id){
        return {
          ...item, completed: !item.completed
        }
      }
      return item;
    }))
  }

  return(
    <div className="todo">
      <p className={`todo-text ${todo.completed}`}>{text}</p>
      <BsCheck className={`check ${todo.completed}`} onClick={checkHandler} id="check" size={30}/>
      <FaUndo className={`undo ${todo.completed}`} onClick={checkHandler} size={30}/>
      <BsTrashFill onClick={deleteHandler} id="trash" size={30}/>
    </div>
  )
}

export default Todo;
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import React, {useState, useEffect} from 'react';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getLocalTodos();
    getLocalName();
  }, []);

  useEffect(() => {
    saveLocalName();
  }, [name]);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch(status){
      case 'Completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'Uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
    }
  }

  const nameHandler = (e) => {
    setName(e.target.value);
  }

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const saveLocalName = () => {
    localStorage.setItem("name", JSON.stringify(name));
  }

  const getLocalName = () => {
    if(localStorage.getItem("name") === null) localStorage.setItem("name", JSON.stringify(""));
    else{
      let nameLocal = JSON.parse(localStorage.getItem("name"));
      setName(nameLocal);
    }
  }

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null) localStorage.setItem("todos", JSON.stringify([]));
    else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }

  const exportJSON = (e) =>{
    var str = JSON.stringify(todos);
    var dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(str);
    e.target.href = dataUri;
  }

  const importJSON = (e) => {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      setTodos(JSON.parse(contents))
    };
    reader.readAsText(file);
  }

  return (
    <div className="App">
      <header>
        <div className="title">
          <h1><input suppressContentEditableWarning="true" contentEditable="true" id="name" onChange={nameHandler} placeholder="Your Name" value={name}/> todo list</h1>
        </div>
        <div className="files">
          <input onClick={importJSON} type="file" placeholder="Import"/>
          <a onClick={exportJSON} href="#" download="myTodoList">Export</a>
        </div>
      </header>
      <Form setStatus={setStatus} todos={todos} setInputText={setInputText} setTodos={setTodos} inputText={inputText} />
      <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;

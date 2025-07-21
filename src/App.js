import { useEffect, useState } from 'react';
import './App.css';
import './responsive.css';
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";

function App() {
  const [isCompleted, setCompleted] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAdd = () => {
    if (newTitle && newDescription) {
      let newTodo = {
      title: newTitle,
      description: newDescription,
      }

    let updatedTodos = [...allTodos];
    updatedTodos.push(newTodo);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setNewTitle('');
    setNewDescription('');
    }
    else {
      alert('Please fill in both title and description');
    }
  }

  
  const handleDelete = (index) => {
    let updatedTodos = [...allTodos];
    updatedTodos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
    
  }

  const handleDone = (index) => {
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hrs = now.getHours(); 
    let mins = now.getMinutes();
    let secs = now.getSeconds();

    let CompletedTime = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year} at ${hrs < 10 ? '0' + hrs : hrs}:${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;

    let filteredItem = {...allTodos[index], CompletedOn: CompletedTime};

    let updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos.push(filteredItem);
    setCompletedTodos(updatedCompletedTodos);
    handleDelete(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
  }

  const handleDeleteCompleted = (index) => {
    let updatedTodos = [...completedTodos];
    updatedTodos.splice(index, 1);
    localStorage.setItem('completedTodos', JSON.stringify(updatedTodos));
    setCompletedTodos(updatedTodos);
    
  }

  useEffect(() => {
    let savedData = JSON.parse(localStorage.getItem('todos'));
    let completedData = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedData) {
      setTodos(savedData);
    }
    if (completedData) {
      setCompletedTodos(completedData);
    }
    }, [])


  return (
    <div className="Todo-App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className='todo-input-wrapper'>
          <div className='todo-input-box'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's the task ?" />
          </div>
          <div className='todo-input-box'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Description" />
          </div>
          <div className='todo-input-box'>
            <button type='button' onClick={handleAdd} className='primaryButton'>Add Todo</button>
          </div>
        </div>
      
        <div className='button-area'>
          <button className={`secondaryButton ${isCompleted === false && 'active'}`} onClick={() => setCompleted(false)}>Pending</button>
          <button className={`secondaryButton ${isCompleted === true && 'active'}`} onClick={() => setCompleted(true)}>Completed</button>
        </div>

        <div className='todo-list'>
          {isCompleted === false && allTodos.map((item, index) => {
          return (<div className='todo-list-item' key={index}>
            <div className='todo-list-item-content'>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
           
            <div className='icons'>
              <MdDelete onClick={(index) => handleDelete(index)} className='delete-icon' />
              <IoMdDoneAll onClick={() => handleDone(index)} className='done-icon' />
            </div>
          </div>
          )
          })}

          {isCompleted === true && completedTodos.map((item, index) => {
          return (<div className='todo-list-item' key={index}>
            <div className='todo-list-item-content completed'>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <i><small>Completed On: {item.CompletedOn}</small></i>
            </div>
           
            <div className='icons'>
              <MdDelete onClick={(index) => handleDeleteCompleted(index)} className='delete-icon' />
            </div>
          </div>
          )
          })}
        </div>

      </div>

    </div>
  );
}

export default App;
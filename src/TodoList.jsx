import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
 
  let [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [{ task: "Coding", id: uuidv4(), isdone: false }];
  });

  let [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addNewTask = () => {
    if (newTodo.trim() === "") {
      alert("Please enter a valid task!");
      return;
    }

    setTodos((prevTodos) =>{ 
        return [...prevTodos, {task: newTodo , id: uuidv4(), isdone:false }];
   });
    setNewTodo("");
    };

  
  const updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  
  const markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isdone: true };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div>
      <input
        placeholder="add a task" value={newTodo} onChange={updateTodoValue}/>
         <br></br> <br></br>
      
      <button onClick={addNewTask}>Add Task</button>

      <h1>___________________________</h1>
      <h2>Tasks Todo</h2>
      <div>
        {todos.map((todo) => (
          <b key={todo.id}>
            <ul>
              <div className="container">
                <span
                  style={todo.isdone ? { textDecoration: "line-through pink" } : {}}>&hearts; &nbsp;{todo.task}</span>
                <div>
                  <i id="done" className="fa-solid fa-square-check" onClick={() => markAsDone(todo.id)}></i>
                  <i id="delete" className="fa-solid fa-trash" onClick={() => deleteTodo(todo.id)}></i>
                </div>
              </div>
            </ul>
          </b>
        ))}
      </div>
    </div>
  );
}

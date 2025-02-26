import { useState } from "react";
import {v4 as uuidv4} from 'uuid';

export default function TodoList(){
    let [todos, setTodos] = useState([{task: "Coding", id:uuidv4(), isdone: false}]);
    let [newTodo, setNewTodo] = useState("");
    
    let addNewTask = () => {
        if (newTodo.trim() === "") {
            alert("Please enter a valid task!");
            return; 
        }

        setTodos((prevTodos) =>{ 
            return [...prevTodos, {task: newTodo , id: uuidv4(), isdone:false }];
    });
    setNewTodo("");
  };


    let updateTodoValue = (event) =>{
       setNewTodo(event.target.value);
    };                                                           


    let deleteTodo = (id) => {
       setTodos((prevTodos) =>
         todos.filter((prevTodos) => prevTodos.id != id));
    };


    let markAsDone = (id) => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) =>{
            if(todo.id == id){
                return{
                    ...todo,
                    isdone: true,
                };
            }else{
                return todo;
            }
        })
    );
    };

    return(
    <div>
        <input placeholder="add a task" value={newTodo} onChange={updateTodoValue}></input>
        <br></br><br></br>

        <button onClick={addNewTask}>Add Task</button>
        
        <h1>___________________________</h1>
       <h2>Tasks Todo</h2>
       <ul>
        {
        todos.map((todo) => (
           <b>
            <p key={todo.id}>
            <span style={todo.isdone ? {textDecoration: "line-through pink "} : {} }>&hearts; &nbsp;&nbsp;{todo.task}</span>
            <button id="isdone" onClick={() => markAsDone(todo.id)}>Done</button>
            <button id="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </p>
            </b>
        ))
        }

       </ul>
    </div>
    );
}
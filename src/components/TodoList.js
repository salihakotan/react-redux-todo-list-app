import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoAsync, getTodosAsync, selectFilteredTodos, toggleTodoAsync } from "../redux/todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";

function TodoList() {


  

    const filteredTodos = useSelector(selectFilteredTodos)

  const dispatch = useDispatch();

  
  const handleDestroy = async(id) => {
    if (window.confirm("Are you sure")) {
     await dispatch(deleteTodoAsync(id));
    }
  };


  const handleToggle = async (id,completed) => {
    await dispatch(toggleTodoAsync({id,data:{completed}}))
  }
 
  useEffect(()=> {
      dispatch(getTodosAsync())
  },[dispatch])



    const isLoading = useSelector((state) => state.todos.isLoading)
    const error = useSelector(state => state.todos.error)

    if(isLoading) return <Loading/>
    if(error) return <Error message={error}/>


  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(item.id,!item.completed)}
            />
            <label>{item.title}</label>
            <button
              onClick={() => handleDestroy(item.id)}
              className="destroy"
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;

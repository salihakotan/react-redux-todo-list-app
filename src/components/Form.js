import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";

function Form() {


  const inputRef  = useRef()
  const isLoading = useSelector((state) => state.todos.addNewTodo.isLoading)

  const error = useSelector((state) => state.todos.addNewTodo.error)

    const [title,setTitle] = useState("")

    const dispatch = useDispatch()


    const handleSubmit = async (e) => {

        if(!title.trim()) return

        e.preventDefault()

        await dispatch(addTodoAsync({title}))

        setTitle("")
        
        inputRef.current?.focus()
    }

 

  return (
    <form style={{display:"flex",alignItems:"center"}} onSubmit={handleSubmit}>
      <input
      ref={inputRef}
      disabled={isLoading}
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
      {isLoading && <Loading/>}
      {error && <Error message={error}/>}
    </form>
  );
}

export default Form;

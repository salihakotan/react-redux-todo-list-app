import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFilter, clearCompleted, selectActiveFilter, selectTodos } from '../redux/todos/todosSlice'

function ContentFooter() {

	const items = useSelector(selectTodos)
	const itemsLeft = items.filter((item) => !item.completed).length
		
	const activeFilter = useSelector(selectActiveFilter)

	const dispatch = useDispatch()

	useEffect(()=> {
		localStorage.setItem("activeFilter",activeFilter)
	},[activeFilter])


  return (
    <footer className="footer">
		<span className="todo-count">
			<strong>{itemsLeft}</strong> {" "}
			item{itemsLeft > 1 && "s"} left
		</span>

		<ul className="filters">
			<li>
				<a onClick={()=> dispatch(changeActiveFilter("all"))} href="#/" className={activeFilter === "all" ? "selected" : ""}>All</a>
			</li>
			<li>
				<a onClick={()=> dispatch(changeActiveFilter("active"))} href="#/" className={activeFilter==="active" ? "selected" : ""}>Active</a>
			</li>
			<li>
				<a onClick={()=> dispatch(changeActiveFilter("completed"))} href="#/"  className={activeFilter==="completed" ? "selected" : ""}>Completed</a>
			</li>
		</ul>

		<button className="clear-completed" onClick={()=> dispatch(clearCompleted())}>
			Clear completed
		</button>
	</footer>
  )
}

export default ContentFooter
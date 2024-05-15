import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios"

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return await res.data;
  });

  export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`,data)
    return await res.data

  })

  export const toggleTodoAsync = createAsyncThunk("todos/toggleTodoAsync", async ({id,data}) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`,data)
    return await res.data
  })


  export const deleteTodoAsync = createAsyncThunk("todos/deleteTodoAsync", async(id) => {
    await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`)
    return id
  })


export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading:false,
    error:null,
    activeFilter: localStorage.getItem("activeFilter") || "all",
    addNewTodo: {
        isLoading:false,
        error:null
    }
  },
  reducers: {
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => !item.completed);
      state.items = filtered;
    },
  },
  extraReducers: (builder)=> {
    builder
    .addCase(getTodosAsync.pending, (state,action)=> {
        state.isLoading =true
    })
    .addCase(getTodosAsync.rejected, (state,action)=> {
        state.isLoading =false
        state.error = action.error.message
    })
    .addCase(getTodosAsync.fulfilled, (state,action)=> {
        state.isLoading=false
        state.items = action.payload
    })
    .addCase(addTodoAsync.fulfilled, (state,action) => {
        state.items.push(action.payload)
        state.addNewTodo.isLoading =false
    })
    .addCase(addTodoAsync.pending, (state,action) => {
        state.addNewTodo.isLoading =true
    })
    .addCase(addTodoAsync.rejected, (state,action) => {
        state.addNewTodo.error =action.error.message
        state.addNewTodo.isLoading=false
    })
    .addCase(toggleTodoAsync.fulfilled, (state,action) => {
        const {id,completed} = action.payload
        const index = state.items.findIndex((item) => item.id === id)
        state.items[index].completed = completed
    })
    .addCase(deleteTodoAsync.fulfilled, (state,action) => {
        const id = action.payload
        ///////////first way
             // const filtered = state.items.filter((item)=> item.id !== id)
             // state.items = filtered
        /////////second way
        const index = state.items.findIndex((item) => item.id === id)
        state.items.splice(index,1)

    })
  }
})

export const selectTodos = (state) => state.todos.items;

export const selectFilteredTodos = (state) =>
  state.todos.items.filter((todo) => {
    if (state.todos.activeFilter === "all") {
      return state.todos.items;
    }

    return state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true;
  });

export const selectActiveFilter = (state) => state.todos.activeFilter;

export const { changeActiveFilter, clearCompleted } =
  todosSlice.actions;

export default todosSlice.reducer;

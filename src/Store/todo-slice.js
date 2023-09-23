import { createSlice } from "@reduxjs/toolkit";

const initialTodoState = {
  todos: [],
  editTodo: {},
  isEdit: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialTodoState,
  reducers: {
    setTodos(state, action) {
      state.todos = action.payload;
    },
    setEditTodo(state, action) {
      state.editTodo = action.payload;
    },
    setIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setUpdateTodo(state, action) {
      let t = state.todos.find((todo) => todo.id == action.payload.id);
      t.todo = action.payload.enteredTodo;
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;

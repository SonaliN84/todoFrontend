import { Fragment } from "react";
import TodoForm from "../components/UserTodo/TodoForm";
import Todos from "../components/UserTodo/Todos";
const Todo = () => {
  return (
    <Fragment>
      <TodoForm />
      <Todos />
    </Fragment>
  );
};
export default Todo;

import { useSelector } from "react-redux";
import ShowTodo from "./ShowTodo";
import "./Todo.css";
const Todos = () => {
  const todoData = useSelector((state) => state.todo.todos);
  return (
    <div className="todoform">
      {todoData.length === 0 && <div>No tasks found!!</div>}
      {todoData.length > 0 &&
        todoData.map((todo) => (
          <ShowTodo
            key={todo.id}
            id={todo.id}
            todo={todo.todo}
            completed={todo.completed}
          />
        ))}
    </div>
  );
};

export default Todos;

import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "../../Store/todo-slice";
import "./Todo.css";
const ShowTodo = (props) => {
  const dispatch = useDispatch();
  const todoData = useSelector((state) => state.todo.todos);
  const token = useSelector((state) => state.auth.token);
  const [checked, setChecked] = useState(props.completed);
  const checkHandler = (e) => {
    console.log(e.target.checked);
    setChecked((prev) => !prev);
    axios
      .put(
        `http://54.84.86.199:3000/todo-status/${props.id}`,
        {
          todo: props.todo,
          completed: e.target.checked,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteTodoHandler = () => {
    axios
      .delete(`http://54.84.86.199:3000/delete-todo/${props.id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        let arr = todoData.filter((todo) => todo.id != props.id);
        dispatch(todoActions.setTodos(arr));
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };
  const editTodoHandler = () => {
    dispatch(todoActions.setEditTodo({ todo: props.todo, id: props.id }));
    dispatch(todoActions.setIsEdit(true));
  };
  return (
    <div className="show">
      <input
        type="checkbox"
        checked={checked}
        onChange={checkHandler}
        className="mb-4 checkbox"
      />
      <div style={{ textAlign: "center" }}>{props.todo}</div>
      <div>
        <button onClick={editTodoHandler} className="tButton mb-4">
          Edit
        </button>
        <button onClick={deleteTodoHandler} className="tButton mb-4">
          X
        </button>
      </div>
    </div>
  );
};
export default ShowTodo;

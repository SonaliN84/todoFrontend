import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { todoActions } from "../../Store/todo-slice";
import "./Todo.css";
const TodoForm = () => {
  const todoInputRef = useRef("");
  const todoData = useSelector((state) => state.todo.todos);
  const token = useSelector((state) => state.auth.token);
  const editTodo = useSelector((state) => state.todo.editTodo);
  const isEdit = useSelector((state) => state.todo.isEdit);
  console.log(todoData);
  const dispatch = useDispatch();
  console.log("editTodo", editTodo);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredTodo = todoInputRef.current.value;
    if (enteredTodo.trim().length <= 0) {
      alert("Enter valid Todo");
      return;
    }
    console.log(enteredTodo);
    if (!isEdit) {
      axios
        .post(
          "http://54.84.86.199:3000/addTodo",
          {
            todo: enteredTodo,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((result) => {
          console.log(result.data.todo);
          dispatch(todoActions.setTodos([...todoData, result.data.todo]));
          todoInputRef.current.value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(
          `http://54.84.86.199:3000/editTodo/${editTodo.id}`,
          {
            todo: enteredTodo,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then(() => {
          dispatch(todoActions.setEditTodo({}));
          dispatch(todoActions.setIsEdit(false));
          dispatch(
            todoActions.setUpdateTodo({
              id: editTodo.id,
              enteredTodo: enteredTodo,
            })
          );
        });
    }
    todoInputRef.current.value = "";
  };
  return (
    <div className="todoform">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          required
          ref={todoInputRef}
          placeholder={editTodo.todo}
          className="todoinput"
        />
        <div className="todoButton">
          {!isEdit && (
            <button type="submit" className="inputbutton mt-4">
              Add Task
            </button>
          )}
          {isEdit && (
            <button type="submit" className="inputbutton mt-4">
              Update Task
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;

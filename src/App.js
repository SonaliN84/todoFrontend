import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import RootLayout from "./pages/RootLayout";
import Todo from "./pages/Todo";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "./Store/todo-slice";
function App() {
  const dispatch = useDispatch();
  const authIsLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (authIsLoggedIn) {
      axios
        .get("http://54.84.86.199:3000/getTodos", {
          headers: { Authorization: token },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.todos);
          dispatch(todoActions.setTodos(result.data.todos));
        });
    }
  }, [authIsLoggedIn]);

  return (
    <RootLayout>
      <Switch>
        {authIsLoggedIn && (
          <Route path="/" exact>
            <Redirect to="/Todo" />
          </Route>
        )}
        {!authIsLoggedIn && (
          <Route path="/" exact>
            <Redirect to="/Login" />
          </Route>
        )}
        <Route path="/Signup">
          <Signup />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Todo" exact>
          <Todo />
        </Route>
      </Switch>
    </RootLayout>
  );
}

export default App;

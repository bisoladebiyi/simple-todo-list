import './App.css';
import Signup from "./pages/signup"
import Login from './pages/login';
import Home from './pages/home';
import shape from "./images/Shape.svg"
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import TodoApp from './pages/todo-app';

function App() {
  return (
    <Router>
      <img className="shape" src={shape} alt=""/>
      <Switch>
      <Route path="/" exact>
      <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <TodoApp />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;

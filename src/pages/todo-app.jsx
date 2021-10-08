import React, { useEffect, useState } from "react";
import { isLoggedIn, getCurrentUser, logOut, fetch } from "../utils";
import { useHistory } from "react-router-dom";
import person from "../images/person.svg";
import TaskItem from "../componenets/taskItem";

const url = "https://bee-todo-app.herokuapp.com/todos";
const accessToken = localStorage.getItem("accessToken");

const TodoApp = () => {
  const history = useHistory();
  const [value, setValue] = useState("");
  const [inputClass, setInputClass] = useState("");
  const [todo, setTodo] = useState({
    userId: getCurrentUser().id,
    description: value,
  });
  const [tasks, setTasks] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (isLoggedIn() === false) {
      history.push("/login");
      return;
    }
    history.push("/dashboard");
  }, [history]);

  useEffect(() => {
    const fetchTasksEndpoint = `https://bee-todo-app.herokuapp.com/todos?userId=${
      getCurrentUser()?.id
    }&$skip=${skip}`;
    fetch(fetchTasksEndpoint, "GET", null, {
      Authorization: `Bearer ${accessToken}`,
    })
      .then((response) => {
        setTasks(tasks.concat(response.data.data));
        setSkip(response.data.skip);
        setLimit(response.data.limit);
        setTotal(response.data.total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [skip]);

  const showInput = () => {
    setInputClass("show-input");
  };

  const changeValue = (e) => {
    setValue(e.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    todo.description = value;
    const newDescription = todo.description;
    setTodo({ ...todo }, newDescription);
    fetch(url, "POST", todo, { Authorization: `Bearer ${accessToken}` })
      .then((response) => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
    setInputClass("");
    setValue("");
  };

  const hasMoreTasks = () => {
    if (skip + limit < total) {
      return true;
    } else {
      return false;
    }
  };

  const viewMoreTasks = () => {
    setSkip(skip + limit);
  };

  const onLogOut = () => {
    logOut(() => {
      history.push("/login");
    });
  };

  const editTask = (id, editInfo) => {
    const editTaskEndpoint = `https://bee-todo-app.herokuapp.com/todos/${id}`;
    fetch(editTaskEndpoint, "PATCH", editInfo, {
      Authorization: `Bearer ${accessToken}`,
    })
      .then((response) => {
        console.log(response)
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTask = (id) => {
    const deleteTaskEndpoint = `https://bee-todo-app.herokuapp.com/todos/${id}`;
    fetch(deleteTaskEndpoint, "DELETE", null, {
      Authorization: `Bearer ${accessToken}`,
    })
      .then((response) => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="name-img-container">
        <div className="name-img">
          <img src={person} alt="" />
          <p>Hi {getCurrentUser()?.firstname}</p>
          <button className="logout-btn" onClick={onLogOut}>
            Log out
          </button>
        </div>
      </div>
      <div className="task-list">
        <p className="list-heading">Task List</p>
        <form action="" className={`input-btn ${inputClass}`} id="input">
          <input
            className="task-input"
            type="text"
            value={value}
            onChange={(e) => changeValue(e)}
            placeholder="Add task"
          />
          <button
            className="btn btn-submit"
            type="submit"
            onClick={(e) => addItem(e)}
          >
            Add
          </button>
        </form>

        <div className="list-container">
          <div className="add-item">
            <p>Task List</p>
            <button onClick={showInput} className="add-btn">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="13" cy="13" r="13" fill="#50C2C9" />
                <rect x="6" y="12" width="14" height="2" fill="white" />
                <rect
                  x="14"
                  y="6"
                  width="13"
                  height="2"
                  transform="rotate(90 14 6)"
                  fill="white"
                />
              </svg>
            </button>
          </div>

          {tasks.map(({ id, description }) => {
            return(
            <TaskItem
              key={id}
              description={description}
              id={id}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          )})}
          {hasMoreTasks() && (
            <button onClick={viewMoreTasks} className="btn load-more">
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

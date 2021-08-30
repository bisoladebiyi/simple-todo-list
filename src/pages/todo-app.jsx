import React, { useEffect, useState } from 'react'
import { isLoggedIn, getCurrentUser, logOut, fetch } from "../utils"
import { useHistory } from 'react-router-dom'
import person from '../images/person.svg'



 const url = "https://bee-todo-app.herokuapp.com/todos"

const accessToken = localStorage.getItem('accessToken')
const TodoApp = () => {
    const history = useHistory()
    const [ value, setValue ] = useState("")
    const [ todo, setTodo ] = useState({ userId: getCurrentUser().id, description: value})
    const [ tasks, setTasks ] = useState([])
    const [ skip, setSkip ] = useState(0)
    const [ limit, setLimit ] = useState(0)
    const [ total, setTotal ] = useState(0)

    useEffect(() => {
        if (isLoggedIn() === false) {
            history.push("/login")
            return 
        }
        history.push("/dashboard")
    }, [history])
    
    useEffect(()=> {
        const fetchTasksEndpoint = `https://bee-todo-app.herokuapp.com/todos?userId=${getCurrentUser()?.id}&$skip=${skip}`
        fetch(fetchTasksEndpoint, 'GET', null,  { 'Authorization': `Bearer ${accessToken}` })
        .then((response)=> {
          setTasks(tasks.concat(response.data.data))
          setSkip(response.data.skip)
          setLimit(response.data.limit)
          setTotal(response.data.total)
       }).catch((error) => {
           console.log(error)
       })
    },[skip])

    const showInput = () => {
        let input = document.getElementById("input")
        input.classList.add("show-input")
    }

    const changeValue = (e) => {
        setValue(e.target.value)
    }

    const addItem = () => {
        todo.description = value
        const newDescription = todo.description
       setTodo({...todo}, newDescription)
        fetch(url, 'POST', todo, { 'Authorization': `Bearer ${accessToken}` })
         .then((response)=> {
        }).catch((error) => {
            console.log(error)
        })
        let input = document.getElementById("input")
        input.classList.remove("show-input")
        setValue("")
    }

    const hasMoreTasks = () => {
        if(skip + limit < total) {
            return true
        } else {
            return false
        }
    }

    const viewMoreTasks = () => {
        setSkip(skip + limit)
    }

    const onLogOut = () => {
        logOut(()=> {
            history.push('/login')
        })
    }

    

    return (
        <div>
            <div className="name-img-container">
                <div className="name-img">
                    <img src={person} alt="" />
                    <p>Hi {getCurrentUser()?.firstname}</p>
                    <button className="logout-btn" onClick={onLogOut}>Log out</button>
                </div>
            </div>
            <div className="task-list">

                <p className="list-heading">Task List</p>
                <div className="input-btn" id="input">
                    <input className="task-input" type="text" value={value} onChange={(e)=> changeValue(e)} placeholder="Add task" />
                    <button className="btn btn-submit" onClick={addItem}>Submit</button>
                </div>

                <div className="list-container">
                    <div className="add-item">
                        <p>Task List</p>
                        <button onClick={showInput} className="add-btn">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="13" cy="13" r="13" fill="#50C2C9" />
                                <rect x="6" y="12" width="14" height="2" fill="white" />
                                <rect x="14" y="6" width="13" height="2" transform="rotate(90 14 6)" fill="white" />
                            </svg>
                        </button>
                   
                    </div>
                         
                   { tasks.map((task)=> {
                       const { id, description } = task;
                       return(
                           <div className="task" key={id}>
                               <p>{description}</p>
                               <div>
                                   <button> <svg
                    className="delete"
                    stroke="currentColor"
                    fill="#eb6d7d"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                  </svg></button>
                
                               </div>
                           </div>
                       )
                   })}
                    {hasMoreTasks() && <button onClick={viewMoreTasks} className="btn load-more">Load More</button>}
                </div>
                
            </div>

        </div>
    )
}

export default TodoApp

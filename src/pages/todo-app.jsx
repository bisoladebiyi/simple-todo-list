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



    useEffect(() => {
        if (isLoggedIn() === true) {
            history.push("/dashboard")
        } else {
            history.push("/login")
        }
    }, [history])

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
       console.log(todo)
        fetch(url, 'POST', todo, { 'Authorization': `Bearer ${accessToken}` })
         .then((response)=> {
            console.log(response)

        }).catch((error) => {
            console.log(error)
        })

        let input = document.getElementById("input")
        input.classList.remove("show-input")
        setValue("")
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
                </div>
            </div>

        </div>
    )
}

export default TodoApp

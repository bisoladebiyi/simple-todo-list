import React, { useEffect } from 'react'
import { isLoggedIn } from "../utils"
import { useHistory } from 'react-router-dom'
import person from '../images/person.svg'





const TodoApp = () => {
    const history = useHistory()
    

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
    const addItem = () => {
        let input = document.getElementById("input")
        input.classList.remove("show-input")
    }
    return (
        <div>
            <div className="name-img-container">
                <div className="name-img">
                    <img src={person} alt="" />
                    <p>Hi *somename*</p>
                </div>
            </div>
            <div className="task-list">

                <p className="list-heading">Task List</p>
                <div className="input-btn" id="input">
                    <input className="task-input" type="text" placeholder="Add task" />
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

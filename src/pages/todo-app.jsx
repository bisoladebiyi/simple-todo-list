import React, { useEffect } from 'react'
import { isLoggedIn } from "../utils"
import { useHistory } from 'react-router-dom'

const TodoApp = () => {
    const history = useHistory()
    useEffect(() => {
       if(isLoggedIn() === true ){
           history.push("/dashboard")
       }else {
           history.push("/login")
       }

    }, [history])
    return (
        <div>
            <p>This is dashboard</p>
        </div>
    )
}

export default TodoApp

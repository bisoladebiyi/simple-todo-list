import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isLoggedIn } from "../utils"


const url = "https://bee-todo-app.herokuapp.com/authentication"



const Login = () => {

    const [loginInfo, setLoginInfo] = useState(data)
    const history = useHistory()
    const [ error, setError ] = useState("")
    // const [ status, setStatus ] = useState(null)

    useEffect(()=> {
        if(isLoggedIn() === true) {
            history.push("/dashboard")
        }
    },[history])


    const changeValue = (e) => {
        const newData = { ...loginInfo }
        newData[e.target.id] = e.target.value
        setLoginInfo(newData)
    }
    const submitData = (e) => {
        e.preventDefault()
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginInfo)
        }).then((res) => {
           
            return res.json()
        } ).then((data) => {
                console.log(data)
                localStorage.setItem('accessToken', data.accessToken)
                localStorage.setItem('userInfo', JSON.stringify(data.user))     
        })
    }

    return (
        <div className="login-signup-page">
            <div className="login-signup">
                <h2 className="welcome">Welcome Back!</h2>
                <p>Let’s help you meet your Task!</p>
                {error && <p>not a user</p>}
                <form action="">
                    <input type="email" id="email" value={loginInfo.email} onChange={(e) => changeValue(e)} placeholder="Email" />
                    <input type="password" id="password" value={loginInfo.password} onChange={(e) => changeValue(e)} placeholder="Password" />
                    <button className="btn" onClick={(e) => submitData(e)}>Sign In</button>
                </form>
                <p>Don't have an account ? <Link to="/signup" className="login-signup-link">Sign Up</Link></p>
            </div>
        </div>
    )
}

const data = {
    email: "",
    password: ""
}
export default Login

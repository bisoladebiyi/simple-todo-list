import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isLoggedIn, fetch } from "../utils"



const url = "https://bee-todo-app.herokuapp.com/authentication"



const Login = () => {

    const [loginInfo, setLoginInfo] = useState(data)
    const history = useHistory()
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (isLoggedIn() === true) {
            history.push("/dashboard")
        }
    }, [history])
    const changeValue = (e) => {
        const newData = { ...loginInfo }
        newData[e.target.id] = e.target.value
        setLoginInfo(newData)
    }
    const submitData = (e) => {
        setIsLoading(true)
        e.preventDefault()
        fetch(url,'POST',loginInfo).then((response) => {
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('userInfo', JSON.stringify(response.data.user))
            history.push("/dashboard")
        }).catch((errorResponse) => {
            setErrorMessage(errorResponse.response.data.message)
        }).finally(()=> setIsLoading(false))
    }

    return (
        <div className="login-signup-page">
            <div className="login-signup">
                <h2 className="welcome">Welcome Back!</h2>
                <p>Let’s help you meet your Task!</p>
                {!!errorMessage && <p className="error-text">{errorMessage}</p>}
                <form action="">
                    <input type="email" id="email" value={loginInfo.email} onChange={(e) => changeValue(e)} placeholder="Email" />
                    <input type="password" id="password" value={loginInfo.password} onChange={(e) => changeValue(e)} placeholder="Password" />
                    <button className="btn" onClick={(e) => submitData(e)}>{isLoading ? "Loading..." : "Sign In"}</button>
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

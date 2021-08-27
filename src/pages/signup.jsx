import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn, fetch } from "../utils"
import { useHistory } from 'react-router-dom'


const url = "https://bee-todo-app.herokuapp.com/users"
const Signup = () => {
    const [signupInfo, setSignupInfo] = useState(data)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    let history = useHistory()



    useEffect(() => {
        if (isLoggedIn() === true) {
            history.push("/dashboard")
        }
    }, [history])
    const changeValue = (e) => {
        const newData = { ...signupInfo }
        newData[e.target.id] = e.target.value
        setSignupInfo(newData)
    }
    const submitData = (e) => {

        e.preventDefault()
        setIsLoading(true)
        fetch(url, 'POST', signupInfo)
            .then((response) => {
                history.push("/login")
            }).catch((error) => {
                setErrorMessage(error.response.data.errors[0].message)
            }).finally(()=> setIsLoading(false))


    }

    return (
        <div className="login-signup-page">
            <div className="login-signup">
                <h2 className="welcome">Welcome Onboard!</h2>
                <p>Let’s help you meet your Task!</p>
                <form action="">
                    {!!errorMessage && <p className="error-text">{errorMessage}</p>}
                    <input type="text" id="firstname" value={signupInfo.firstname} onChange={(e) => changeValue(e)} placeholder="First name" />
                    <input type="text" id="lastname" value={signupInfo.lastname} onChange={(e) => changeValue(e)} placeholder="Last name" />
                    <input type="email" id="email" value={signupInfo.email} onChange={(e) => changeValue(e)} placeholder="Email address" />
                    <input type="password" id="password" value={signupInfo.password} onChange={(e) => changeValue(e)} placeholder="Password" />


                    <button className="btn" onClick={(e) => submitData(e)}>{isLoading ? "Loading..." : "Register"}</button>
                </form>
                <p>Already have Account ? <Link to="/login" className="login-signup-link">Sign In</Link></p>
            </div>
        </div>
    )
}


const data = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
}

export default Signup

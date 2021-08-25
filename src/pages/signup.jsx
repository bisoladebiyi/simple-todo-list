import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn } from "../utils"
import { useHistory } from 'react-router-dom'


const url = "https://bee-todo-app.herokuapp.com/users"
const Signup = () => {
    const [signupInfo, setSignupInfo] = useState(data)
    const [error, setError] = useState("")
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
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupInfo)
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                setError("error")
                throw new Error('Something went wrong');
            }
        }
        ).then((data) => {
            console.log(data)
            localStorage.setItem("data", JSON.stringify(data))
            history.push("/dashboard")
        }).catch((error) => {
            console.log(error)
        })


    }

    return (
        <div className="login-signup-page">
            <div className="login-signup">
                <h2 className="welcome">Welcome Onboard!</h2>
                <p>Let’s help you meet your Task!</p>
                <form action="">
                    {error && <p className="error-text">Already registered email</p>}
                    <input type="text" id="firstname" value={signupInfo.firstname} onChange={(e) => changeValue(e)} placeholder="First name" />
                    <input type="text" id="lastname" value={signupInfo.lastname} onChange={(e) => changeValue(e)} placeholder="Last name" />
                    <input type="email" className={`${error}`} id="email" value={signupInfo.email} onChange={(e) => changeValue(e)} placeholder="Email address" />
                    <input type="password" id="password" value={signupInfo.password} onChange={(e) => changeValue(e)} placeholder="Password" />


                    <button className="btn" onClick={(e) => submitData(e)}>Register</button>
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

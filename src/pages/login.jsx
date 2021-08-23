import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="login-signup-page">
            <div className="login-signup">
                <h2 className="welcome">Welcome Back!</h2>
                <p>Let’s help you meet your Task!</p>
                <form action="" autocomplete="false">


                    <input type="email" placeholder="Email" />


                    <input type="password" placeholder="Password" />


                    <button className="btn">Sign In</button>
                </form>
                <p>Don't have an account ? <Link to="/signup" className="login-signup-link">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login

import React from 'react'

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
                <p>Don't have an account ? <a href="/" className="login-signup-link">Sign Up</a></p>
            </div>
        </div>
    )
}

export default Login

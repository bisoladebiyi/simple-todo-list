import React from 'react'

const Signup = () => {
    return (
        <div className="login-signup-page">
            <div className="login-signup">
                <h2 className="welcome">Welcome Onboard!</h2>
                <p>Let’s help you meet your Task!</p>
                <form action="" autocomplete="false">
                    <div className="input-container">
                    <input type="text" placeholder="First name"/>
                    </div>
                    <div className="input-container">
                    <input type="text" placeholder="Last name"/>
                    </div>
                    
                    <div className="input-container">
                    <input type="email" placeholder="Email address"/>
                    </div>
                    <div className="input-container">
                    <input type="text" placeholder="Phone number"/>
                    </div>
                    <div className="input-container">
                    <input type="password" placeholder="Password"/>
                    </div>
                    
                    <button className="btn">Register</button>
                </form>
                <p>Already have Account ? <a href="/" className="login-signup-link">Sign In</a></p>
            </div>
        </div>
    )
}

export default Signup

import React, { useEffect } from 'react'
import image from '../images/undraw.svg'
import { Link, useHistory } from 'react-router-dom'
import { isLoggedIn } from "../utils"

const Home = () => {
    const history = useHistory()
    useEffect(()=> {
        if(isLoggedIn() === true) {
            history.push("/dashboard")
        }else {
            history.push("/")
        }

    },[history])
    return (
        <div className="home-page">
            <div className="home-container">
            <img className="home-img" src={image} alt=""/>
          <div className="home-details">
              <h2>Things To Do With TODO</h2>
              <p className="home-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper leo in eros parturient arcu odio diam. Gravida faucibus ac mauris et risus.</p>
              <Link to="/signup"><button className="btn btn2">Register</button></Link>
              <Link to="/login"><button className="btn btn2">Sign In</button></Link>
          </div>
            </div>
       
        </div>
    )
}

export default Home

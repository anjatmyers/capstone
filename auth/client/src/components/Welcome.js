import React from "react";
import { Link } from 'react-router-dom';


const Welcome = () => {
  return (
    
    <div style={{height: "100vh"}} className="d-flex flex-column justify-content-center align-items-center">
     

    <div className="col-8">
    <h1 className="text-white display-4 text-center">Welcome to</h1>
     <br/>
     <br/>
    <h2  className="text-white display-6 text-center">BOOTCAMP SURVIVAL GUIDE</h2>
    
    <p className="text-white text-center mt-4">Already have an account? <Link className="text-white text-center" to="/login">Log in</Link></p>
     <p className="text-white text-center mt-2">New here? <Link className="text-white text-center" to="/signup">Register</Link></p>
    </div>
    
     
    
    </div>

    
   
  )
};

export default Welcome;

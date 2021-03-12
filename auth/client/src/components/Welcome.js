import React from "react";
import { Link } from 'react-router-dom';


const Welcome = () => {
  return (
    
    <div style={{height: "100vh"}} className="d-flex flex-column justify-content-center align-items-center">
     {/* <img height="100px" src="https://avatars.githubusercontent.com/u/67744643?s=200&v=4" alt=""/> */}
     

    <div className="col-8">
    <h1 className="text-white display-4 text-center">Welcome to</h1>
     <br/>
     {/* <h2 className="text-white display-3 text-center">CRUDS</h2> */}
     <br/>
    <h2  className="text-white display-6 text-center">BOOTCAMP SURVIVAL GUIDE</h2>
    {/* <h4  className="text-white text-center">A place for all your</h4>
    <h3 className="text-white text-center">Coding Resources to Update your Development Skills</h3> */}
    
    <p className="text-white text-center mt-4">Already have an account? <Link className="text-white text-center" to="/login">Log in</Link></p>
     <p className="text-white text-center mt-2">New here? <Link className="text-white text-center" to="/signup">Register</Link></p>
    </div>
    
     
    
    </div>

    
   
  )
};

export default Welcome;

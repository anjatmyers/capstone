import React from "react";
import { Link } from 'react-router-dom';
import {moduleName} from 'react-bootstrap';


const Welcome = () => {
  return (
    
    <div style={{height: "100vh"}} className="d-flex flex-column justify-content-center align-items-center">
     <img height="100px" src="https://avatars.githubusercontent.com/u/67744643?s=200&v=4" alt=""/>
     <h1 className="text-white bg-warning">Welcome</h1>
     <br/>
     

     <h5 className="text-white">This is an unprotected page.  Any user should be able to see this page, regardless of their login status.</h5>
    
     <p>Already have an account? <Link to="/login">Log in</Link></p>
     <p>New here? <Link to="/signup">Register</Link></p>
    
    </div>

    
   
  )
};

export default Welcome;

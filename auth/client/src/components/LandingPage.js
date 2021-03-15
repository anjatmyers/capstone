import React from "react";
import { Link, useHistory } from 'react-router-dom';
import '../assets/styles2.css';
import Button from '@material-ui/core/Button';

const LandingPage = () => {

    const history = useHistory();

    const handleRegister = () => {
        
        history.push('/signup')
    }
    const handleSignIn = () => {
        
        history.push('/login')
    }
    

  return (
    
    <div style={{height: "100vh"}} className="d-flex flex-column justify-content-center align-items-center">
  
    <div className="col-11  d-flex flex-column align-items-center">

    <div className="row col mt-5 mt-md-2">
        <div className="col d-flex flex-column justify-content-center">
        <h1 className="text-white display-4 text-center welcome mt-3 mt-sm-1 ">Welcome to</h1>
        <h2  className="text-white display-4 text-center name mt-2">C.R.U.D.S.</h2>
        <h2  className="text-white display-6 text-center name">BOOTCAMP SURVIVAL GUIDE</h2>
        </div>
        {/* end col one in row one */}
    </div>
    {/* end of row one */}

    <div className="row col ">
    <div className="col-lg-5 col  d-flex flex-column align-items-end">
    
     <br/>
     <img src="../../images/laptop.png" className=" logo mb-4"></img>
    
    </div>
    {/* end col one in row two */}
    <div className="col-lg-7 col mt-lg-5">
        <div className="col text-center col col-lg-7 offset-lg-3">
        <br/>
        <p className="projectDescription">The place for all your Coding Resources to Upgrade your Development Skills</p>
        <br/>
      
        </div>
        {/* end of mini col ONE in right bottom  */}
        <div className="col  mt-4">
        <p className="text-white text-center ">Already have an account? <br/>
        <Button variant="contained" className="mx-1 m-lg-3 text-center" onClick={handleSignIn} >Sign In</Button>
        </p>
        <p className="text-white text-center ">New here? <br/>
        <Button variant="contained" className="mx-1 my-2 m-lg-3 text-center" onClick={handleRegister} >Register</Button>
        </p>
        </div>
        
         {/* end of mini col TWO in right bottom  */}
    </div>
    {/* end col two in row two */}

    </div>
    {/* end of row two */}


    
    
    
    </div>
    {/* end outside container div */}
     
    
    </div>

    
   
  )
};

export default LandingPage;
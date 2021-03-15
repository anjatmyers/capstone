import React from "react";
import { Link, useHistory } from 'react-router-dom';
import '../assets/styles2.css';
// import Background from "../assets/bootcampVScode.png"
import Background from "../assets/VScode.png"
import Button from "@material-ui/core/Button"

const LandingPage = () => {

    const history = useHistory();

    const handleRegister = () => {
        
        history.push('/signup')
    }
    const handleSignIn = () => {
        
        history.push('/login')
    }

    // const useStyles = makeStyles((theme) => ({

      
    // })
    

  return (
    
    <div style={{height: "100vh"}} className="d-flex flex-column justify-content-center align-items-center">

     {/* <img height="100px" src="https://avatars.githubusercontent.com/u/67744643?s=200&v=4" alt=""/> */}
     {/* style={{backgroundImage: `url(${Background})`}} */}
     

    <div className="col-12 d-flex align-items-center parallax ">


    <div className="col-lg-6 col-0 bg-danger "></div>

    <div className="col-lg-7 col-10 mr-5  h-100 d-flex align-items-center">

  
    {/* <div className="col-lg-5 col d-flex bg-primary flex-column align-items-end "> */}
    
     <br/>
     {/* <img src="../../images/laptop.png" className=" logo mb-4"></img> */}
    

    {/* <h4  className="text-white text-center">A place for all your</h4>
    <h3 className="text-white text-center">Coding Resources to Update your Development Skills</h3> */}
    
    {/* </div> */}

    {/* end col one in row two */}
    <div className="col-lg-8 col  offset-lg-1 mt-lg-5 ">
        <div className="col text-center col col-lg-7 offset-lg-3">
        {/* <br/>
        <p className="projectDescription">The place for all your Coding Resources to Upgrade your Development Skills</p>

        <br/> */}
        <h2 className="text-white mb-0" style={{fontSize: '45px', fontWeight: 'bold'}}>BugOut </h2>
        <h2 className="text-white mt-0" style={{fontSize: '35px', fontWeight: ''}}>BootCamp Survival Guide </h2>
          <img src="../../images/laptop.png" className=" logo text-center mr-4" ></img>
          {/* style={{width: '250px', marginRight: '20px'}} */}
        
        
        </div>
        {/* end of mini col ONE in right bottom  */}
        <div className="col h-25 mt-4" >

        <div className=" row ">
          <div className=" col-12 col-lg-6 ">
          <p className="text-white text-center ">Returning User?<br/>
        <Button variant="contained" className="mx-1 my-2  m-lg-3 text-center" onClick={handleSignIn} >Sign In</Button>
        </p>
          </div>
        <div className=" col-12 col-lg-6">
        <p className="text-white text-center ">New here? <br/>
        <Button variant="contained" className="mx-1 my-2 m-lg-3 text-center mb-4" onClick={handleRegister} >Register</Button>
        </p>
        </div>
      
        </div>
        {/* end buttons div */}
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
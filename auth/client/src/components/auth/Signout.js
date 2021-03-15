
import React from "react";
import {useDispatch} from 'react-redux';
import {signOut} from '../../actions/index';
import {useHistory} from 'react-router-dom'

const Signout = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const logOut = () => {
    
      dispatch(signOut(()=>{
        history.push('/');
      }));
  }

  return <div style={{height: "100vh"}} className="d-flex flex-column justify-content-center align-items-center">
  

  <h1 className="text-warning">Sorry to see you go!</h1>
  
  <button className="btn btn-info" onClick={logOut}>Sign Out</button>
  <h3 className="text-info mt-2">Goodbye </h3> 
 </div>
};

export default Signout;

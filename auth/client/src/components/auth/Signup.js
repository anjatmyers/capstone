import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../actions/index";
import { useHistory } from "react-router-dom";
import { Grid, Paper, Avatar } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "20px auto",
  };
  const avatarStyle = { 
    backgroundColor: "#0ff1c3",
    height: 100,
    width: 100,};

  
    const handleSubmit = (e) => {
      
      e.preventDefault();
  
      // call action
      //pass the email address and password to our action
      //dispatch(sinup(), cb)
  
      dispatch(signUp({
        email: email,
        password: password
      }, ()=>{
        console.log('pushing to another page');
        history.push('/home');
      }))

  
    }

  return (
    <div>
      <Grid>
        <Paper className="register" elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <h3>Register a new account</h3>
            <form onSubmit={handleSubmit} className="form">
              <div className="form__field">
                <input
                  type="email"
                  placeholder="info@mailaddress.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form__field">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                />
              </div>

              <div className="form__field">
                <input type="submit" value="Sign Up" />
              </div>


              <div>
              <p>Already have an account? <Link to="/login">Log In</Link></p>
              </div>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default Signup;









// import React, {useState} from "react";
// import { Link } from 'react-router-dom';
// import {useDispatch} from 'react-redux';
// import {signUp} from '../../actions/index';
// import {useHistory} from 'react-router-dom'

// const Signup = () => {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const handleSubmit = (e) => {
    
//     e.preventDefault();

//     // call action
//     //pass the email address and password to our action
//     //dispatch(sinup(), cb)

//     dispatch(signUp({
//       email: email,
//       password: password
//     }, ()=>{
//       console.log('pushing to another page');
//       history.push('/home');
//     }))



//   }

//   return (
//   <div className="mt-5">
  
//     <div className="grid align__item">

//       <div className="register">

//             <img height="100px" src="https://avatars.githubusercontent.com/u/67744643?s=200&v=4" alt=""/>

//             <h2>Sign Up</h2>

//             <form action="" method="post" onSubmit={handleSubmit} className="form">

//               <div className="form__field">
//                 <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="enter email address" />
                
//               </div>

//               <div className="form__field">
//                 <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter password" />
//               </div>

//               <div className="form__field">
//                 <input type="submit" value="Sign Up" />
//               </div>

//           </form>

//           <p>Already have an account? <Link to="/signin">Log in</Link></p>

//       </div>

//     </div>
  
//   </div>);
// };

// export default Signup;






// import React, {useState} from "react";
// import { Link } from 'react-router-dom';
// import {useDispatch} from 'react-redux';
// import {signUp} from '../../actions/index';
// import {useHistory} from 'react-router-dom'

// const Signup = () => {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const history = useHistory();

// const handleSubmit = (e) => {
//   e.preventDefault();

// // want to take this info and call our API on the backend so that it can send us back a token and it will be stored in local storage and redux store (so when we go to other protected pages we will ba easily be able to see there is a valid token)
// // call action and pass it the email and password 
// // dispatch(signUp(), callBackFunction)
// dispatch(signUp({
//   email: email,
//   password: password
// }), ()=>{
//   history.push('/welcome');
// })

// }


//   return (
//   <div className="mt-5">
  
//     <div className="grid align__item">

//       <div className="register">

//             <img height="100px" src="https://avatars.githubusercontent.com/u/67744643?s=200&v=4" alt=""/>

//             <h2>Sign Up</h2>

//             <form action="" method="post" onSubmit={handleSubmit} className="form">

//               <div className="form__field">
//                 <input type="email" onChange={(e)=> setEmail(e.target.value)} value={email} placeholder="enter email address" />
              
              
//               </div>

//               <div className="form__field">
//                 <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password} placeholder="enter password" />
//               </div>

//               <div className="form__field">
//                 <input type="submit" value="Sign Up" />
//               </div>

//           </form>

//           <p>Already have an account? <Link to="/signin">Log in</Link></p>

//       </div>

//     </div>
  
//   </div>);
// };

// export default Signup;

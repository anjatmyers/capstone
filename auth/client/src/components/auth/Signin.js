import React, {useState} from "react";
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {signIn} from '../../actions/index';
import {useHistory} from 'react-router-dom';
import "../../assets/styles.scss";


const Signin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signIn({
      email: email,
      password: password
    }, ()=>{
      console.log('pushing to another page');      history.push('/home');
    }))

  }

  return( 
 
  <div className="mt-5">
  
    <div className="grid align-item">

      <div className="register">

        <img height="100px" src="" alt=""/>
      

        <h2 className="">Sign In</h2>

        <form onSubmit={handleSubmit}  className="form">

            <div className="form__field">
              <input type="email" placeholder="info@mailaddress.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="form__field">
              <input type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="••••••••••••" />
            </div>

            <div className="form__field">
              <input type="submit" value="Log In" />
            </div>

        </form>

        <p>Don't have an account? <Link to="/signup">Register Here</Link></p>

      </div>

    </div>
  
  </div>

  // end container div
  
  );
};

export default Signin;

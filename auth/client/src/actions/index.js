
import actionTypes from './actionTypes';
import axios from 'axios';


export const signUp = (formData, cb) => {
    
    console.log(formData)
    // take email and password 
    // call server API 
    // wait for an authenticated token 
    // call reducer to store token 

    // formData => {email, password}

    // returning a function not an object
    // return dispatch => .... could be seen like this on one line 

    // SIGN UP
    return async dispatch => {

        try{
            let response = await axios.post('http://localhost:3001/signup', formData) //form data will be put on header
            
            console.log("signUp", response.data.token); //response should give back a token
            
            // dispatch action to reducer

            dispatch({type: "AUTH_USER", data: response.data.token});

            localStorage.setItem('token', response.data.token);

            cb();
        }
        catch(e){
            console.log('error')
            console.log(e);
        }

    }
}

// SIGN IN

export const signIn = (formData) => {
    
    return async dispatch => {

        try{
            let response = await axios.post('http://localhost:3001/signin', formData);
            dispatch({type: "AUTH_USER", data: response.data.token})

            console.log("signIn", response.data.token)
            localStorage.setItem('token', response.data.token);
        }
        catch(e){
            console.log(e)
        }

    }

}


// SIGN OUT: clears out the token from global state and local storage

export const signOut = () => {

    localStorage.removeItem('token');

    console.log("signing out")
    return {
        type: "AUTH_USER",
        data: ''
    }
}


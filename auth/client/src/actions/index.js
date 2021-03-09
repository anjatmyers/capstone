import actionTypes from './actionTypes';
import axios from 'axios';


// function to get oauth URL from back end
export const getURL = () => {

    return async dispatch =>{

        try{
            let response = await axios.post('http://localhost:3001/getURL');

            console.log(response.data);

            // window.location = function() {
            //     location.href = response.data;
            // }

            window.location.href = response.data;
            // dispatch({type: "AUTH_USER", data: response.data.token});

            // console.log('signin', response.data.token);
            // localStorage.setItem('token', response.data.token);

            // cb();
        }
        catch(e){
            console.log("error from getURL action")
        }
    }
    
}



export const signUp = (formData, cb) => {
    
    console.log(formData);
    //take username and passpword
    //call our server api 
    //wait for an authenticated token 
    //call reducer to store token

    //formData => {email, password}
    
    return async dispatch=>{
        
        try{
            let response = await axios.post('http://localhost:3001/signup', formData) //formdata will put on header

            console.log(response.data.token);//token

            //dispatch action to reducer 

            dispatch({type: "AUTH_USER", data: response.data.token});

            localStorage.setItem('token', response.data.token);

            cb();

        }
        catch(e){
            console.log('error');
            console.log(e);
        }
    }
}

//logging into application

export const signIn = (formData, cb) => {
    
    return async dispatch =>{

        try{
            let response = await axios.post('http://localhost:3001/signin', formData);

            dispatch({type: "AUTH_USER", data: response.data.token});

            console.log('signin', response.data.token);
            localStorage.setItem('token', response.data.token);

            cb();
        }
        catch(e){

        }
    }
}

//logout

export const signOut = (cb) => {

    return dispatch=> {
        localStorage.removeItem('token');
        dispatch({
            type: "AUTH_USER",
            data: ''
        })

        console.log('signing out');

        cb();
    }
      
    
}


export const setLanguage = (language) =>{
    return {
        type: "CHANGE_LANGUAGE",
        language: language
    }

}




// import actionTypes from './actionTypes';
// import axios from 'axios';


// export const signUp = (formData, cb) => {
    
//     console.log(formData)
//     // take email and password 
//     // call server API 
//     // wait for an authenticated token 
//     // call reducer to store token 

//     // formData => {email, password}

//     // returning a function not an object
//     // return dispatch => .... could be seen like this on one line 

//     // SIGN UP
//     return async dispatch => {

//         try{
//             let response = await axios.post('http://localhost:3001/signup', formData) //form data will be put on header
            
//             console.log("signUp", response.data.token); //response should give back a token
            
//             // dispatch action to reducer

//             dispatch({type: "AUTH_USER", data: response.data.token});

//             localStorage.setItem('token', response.data.token);

//             cb();
//         }
//         catch(e){
//             console.log('error')
//             console.log(e);
//         }

//     }
// }

// // SIGN IN

// export const signIn = (formData) => {
    
//     return async dispatch => {

//         try{
//             let response = await axios.post('http://localhost:3001/signin', formData);
//             dispatch({type: "AUTH_USER", data: response.data.token})

//             console.log("signIn", response.data.token)
//             localStorage.setItem('token', response.data.token);
//         }
//         catch(e){
//             console.log(e)
//         }

//     }

// }


// // SIGN OUT: clears out the token from global state and local storage

// export const signOut = () => {

//     localStorage.removeItem('token');

//     console.log("signing out")
//     return {
//         type: "AUTH_USER",
//         data: ''
//     }
// }


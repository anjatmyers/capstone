import axios from 'axios';
import actionTypes from './actionTypes';

// function to get oauth URL from back end
export const getURL = () => {

    return async dispatch =>{

        try{
            let userID = localStorage.getItem('id')
            let response = await axios.post('http://localhost:3001/getURL', {userID});

            window.location.href = response.data;
           
        }
        catch(e){
            console.log("error from getURL action")
        }
    }
    
}


export const signUp = (formData, cb) => {
    
    //take username and passpword
    //call our server api 
    //wait for an authenticated token 
    //call reducer to store token

    //formData => {email, password}
    
    return async dispatch=>{
        
        try{
            let response = await axios.post('http://localhost:3001/signup', formData) //formdata will put on header

            //dispatch action to reducer 

            dispatch({type: "AUTH_USER", data: response.data.token});
            dispatch({type: "USER_ID", data: response.data.id[0].id});

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.id[0].id);

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
            dispatch({type: "USER_ID", data: response.data.id[0].id});

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.id[0].id);

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

        localStorage.removeItem('id');
        dispatch({
            type: "USER_ID",
            data: ''
        })

        console.log('signing out');

        cb();
    }

}

export const folderStatus = (status) => {

    return {
        type: "CHANGE_STATUS",
        data: status
    }
}


export const setLanguage = (language) =>{
    return {
        type: "CHANGE_LANGUAGE",
        language: language
    }

}

export const setTipsData = (data) =>{
    return {
        type: "SET_DATA",
        payload: data

    }
}

export const setEditorInput = (editorInput) => {
    return {
        type: "SET_INPUT",
        data: editorInput

    }
}

export const searchedJobs = (job) => {
    return {
        type: "SEARCHED_JOBS",
        data: job
    }
}

export const hideButton = (status) => {
    return {
        type: "HIDE_BUTTON",
        data: status
    }
}




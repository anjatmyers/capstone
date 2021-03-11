import actionTypes from '../actions/actionTypes';


const initialState = {
    authenticated: "",
<<<<<<< HEAD
    userid: "",
    folderStatus: false
=======
    language: ""
>>>>>>> main
}

const reducerTemplate = (state = initialState, action) => {

    switch(action.type){

        case "AUTH_USER":
            return{
                ...state,
                authenticated: action.data //json web token 
            }
<<<<<<< HEAD
        case "USER_ID":
            return{
                ...state,
                userid: action.data
            }
        case "CHANGE_STATUS":
            return{
                ...state,
                folderStatus: action.data
=======
        case "CHANGE_LANGUAGE":
            return{
                ...state,
                language: action.language
>>>>>>> main
            }
        default:
            return state;
    } 
}


export default reducerTemplate

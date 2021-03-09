import actionTypes from '../actions/actionTypes';


const initialState = {
    authenticated: "",
    language: ""
}

const reducerTemplate = (state = initialState, action) => {

    switch(action.type){

        case "AUTH_USER":
            return{
                ...state,
                authenticated: action.data //json web token 
            }
        case "CHANGE_LANGUAGE":
            return{
                ...state,
                language: action.language
            }
        default:
            return state;
    } 
}


export default reducerTemplate

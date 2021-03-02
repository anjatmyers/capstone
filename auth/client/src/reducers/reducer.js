import actionTypes from '../actions/actionTypes';

const initialState = {
    authenticated: ""
}

const reducerTemplate = (state = initialState, action) => {

    switch(action.type){

        case "AUTH_USER":
            return{
                ...state,
                authenticated: action.data //json web token 
            }
        default:
            return state;
    } 
}


export default reducerTemplate

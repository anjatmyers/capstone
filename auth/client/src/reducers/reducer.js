import actionTypes from '../actions/actionTypes';

const initialState = {
    authenticated: "",
    userid: "",
    folderStatus: false
}

const reducerTemplate = (state = initialState, action) => {

    switch(action.type){

        case "AUTH_USER":
            return{
                ...state,
                authenticated: action.data //json web token 
            }
        case "USER_ID":
            return{
                ...state,
                userid: action.data
            }
        case "CHANGE_STATUS":
            return{
                ...state,
                folderStatus: action.data
            }
        default:
            return state;
    } 
}


export default reducerTemplate


import {combineReducers} from 'redux';
import reducerTemplate from './reducer';
// import {formReducer} from 'redux-form'


export default combineReducers({
    auth: reducerTemplate
    // form: formReducer

})
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Welcome from './components/Welcome';
import Feature from './components/Feature'; //protect
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import Login from "./components/auth/Login";
import BaseLayout from './components/layout/BaseLayout';
import "./assets/styles.scss";


import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducers/index'; 
import requireAuth from './requireAuth';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';



const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#e1f5fe',
      dark: '#b0c3cc',
      contrastText: '#000000',
    },
    secondary: {
      light: '#e5ffff',
      main: '#b2ebf2',
      dark: '#81b9bf',
      contrastText: '#424242',
    },
  },
});


// ***********
const saveToLocalStorage = (reduxGlobalState) => {
  // serialize = converting JS object to a string
  try{

    const serializeState = JSON.stringify(reduxGlobalState);
    localStorage.setItem('state', serializeState);
  }
  catch(e){
    console.log(e);
  }


}
const loadFromLocalStorage = (reduxGlobalState) => {
  
  const serializeState = localStorage.getItem('state');

  if(serializeState === null){
    return undefined;
  }
  else{
    return JSON.parse(serializeState);
    // returns a JS object representing local storage
  }

}
// ******


const persistedState = loadFromLocalStorage();
// initializing redux store
// requires a reducer. Second argument is for redux dev-tools extension.
let store = createStore(reducer, persistedState, 
  compose(
    applyMiddleware(reduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ) );


  store.subscribe(() => {
    saveToLocalStorage(store.getState());
  })

//provider hooks react to redux.  
//Must pass redux instance to provider via "store" prop.

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path='/' component={Welcome}/>
            <Route path='/home' component={requireAuth(App)}/>
            <Route path='/signup' component={Signup}/>
            <Route path='/feature' component={requireAuth(Feature)}/>
            <Route path='/signout' component={Signout}/>
            <Route path='/signin' component={Signin}/>
            <Route path='/login' component={Login}/>

          </Switch>
      </ThemeProvider>
      </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

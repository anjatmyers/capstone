import React, {Component} from 'react';
import {connect} from 'react-redux'

// Higher order component

export default (ChildComponent) => {

    class ComposedComponent extends Component {

        componentDidMount(){
            this.isAuthenticated();
        }

        componentDidUpdate(){
            this.isAuthenticated();
        }

        // is our user authenticated?
        isAuthenticated = ()=> {
            if(!this.props.auth){
                // redirect our user back to home page
                this.props.history.push('/'); //redirecting via react-router
            }
        }

        render(){

           return  <ChildComponent {...this.props}/> //returns original comp  with additioanal logic attached
            }
        
    } //class component 


const mapStateToProps = (state) => {
    return {
        auth: state.auth.authenticated
    }
}

return connect (mapStateToProps, null)(ComposedComponent)

}//inside HOC

// composed component is the child comp passed in with all the additional logic passed with it 
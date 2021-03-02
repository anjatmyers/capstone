
import React from 'react';

const App = (props) => {
  return (
    
    <div style={{height: "100vh"}} className="d-flex flex-column justify-content-center align-items-center">
     <img height="100px" src="https://avatars.githubusercontent.com/u/67744643?s=200&v=4" alt=""/>
     <h1 className="text-white">Client Side Authentication with JWTs</h1>
     <br/>
     <h3 className="text-warning">Learning about JWTs for React Authentication</h3>

     <h5 className="text-info">This is an unprotected page.  Any user should be able to see this page, regardless of their login status.</h5>
    </div>
   
  )
}

export default App

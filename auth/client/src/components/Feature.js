import React from 'react'
import Form from './JobBoard/Form'
import JobCard from './JobBoard/JobCard'

const Feature = () => {

  return (
    <>
    <div className="container-fluid mx-2">

      <div className=""><Form /></div>

      <div className="mt-4"><JobCard /></div>
      
    </div>
    </>
  )
}

export default Feature









// import React from "react";
// import {Link} from 'react-router-dom'

// const Feature = () => {


//   return <div style={{height: "100vh"}} className="d-flex flex-column justify-content-center align-items-center">
//   <h1 className="text-white">Second Page</h1>

//   <h3 className="text-warning">This is a protected page</h3>
//   <h5 className="text-info">This page should only be seen if user is logged in</h5>


//   <p><Link to="/home">Home</Link></p>


//  </div>
// };

// export default Feature;

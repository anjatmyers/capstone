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


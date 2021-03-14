import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const JobCard = () => {

    const jobs = useSelector(state => state.auth.jobs)
    console.log(jobs);
    // let jobs = localStorage.getItem('jobs');
    // console.log(jobs)
    // let jobs;

    // useEffect((jobs) => {

    //     jobs = localStorage.getItem('jobs');
      
    // }, [jobs])

    console.log(jobs);

//   return (
//     <>
//       {jobs.map((job) => {

//         return (
//         <div className="card" key={job.id}>
//             <div className="card-body">
//                 <div className="card-title">
//                     <h1>{job.name}</h1>
//                     <h5>{job.company.name} | {job.location[0].name}</h5>
//                 </div>
//                 <div className="card-text">
//                     <p>{job.contents}</p>
//                     <Link to={job.refs.landing_page} />
//                 </div>
//             </div>
//         </div>
//         )
//         })}
//     </>
//   )
  {if (jobs){
    return (
        <>
          {jobs.map((job) => {
    
            return (
            <div className="card" key={job.id}>
                <div className="card-body">
                    <div className="card-title">
                        <h1>{job.title}</h1>
                        <h5>{job.company.display_name} | {job.location.display_name}</h5>
                    </div>
                    <div className="card-text">
                        <p>{job.description}</p>
                        <Link to={job.redirect_url}>View Job Listing</Link>
                    </div>
                </div>
            </div>
            )
            })}
        </>
      )
  }}
}

export default JobCard

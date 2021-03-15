import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import LaunchIcon from '@material-ui/icons/Launch';


const JobCard = () => {
    const jobs = useSelector(state => state.auth.jobs)

    const handleURLRedirect = (link) => {
      window.open(link, '_blank');
    }
    

  {if (jobs){
    return (
        <>
          {jobs.map((job) => {
            return (
              
            <div className="card mt-3" key={job.id} style={{backgroundColor: '#dce6ee'}}>
                <div className="card-body">
                    <div className="row">
                    <div className="card-title my-0 col-12 ml-3 col-lg-5" dangerouslySetInnerHTML={{ __html: `<h3>${job.title}</h3>` }} />
                    <div className="card-title mt-0 col-12 col-lg-6" dangerouslySetInnerHTML={{ __html: `<h6>${job.company.display_name} | ${job.location.display_name}</h6>` }} />
                    </div> 
                    <div className="card-text">
                        <p dangerouslySetInnerHTML={{ __html: `${job.description}` }}/>
                        <Link onClick={()=>handleURLRedirect(job.redirect_url)} style={{color: "black"}}>View Job Listing &nbsp; <LaunchIcon/></Link>
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


import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { searchedJobs } from '../../actions'
import {Button} from 'react-bootstrap'

const Form = () => {

  const dispatch = useDispatch();
  const history = useHistory()
  // const [jobs, setCurrentJobs] = useState({});
  const jobs = useSelector(state => state.jobs)

  const handleSearch = async (e) => {

    e.preventDefault();

    let jobTitle = localStorage.getItem('jobTitle');
    let jobLocation = localStorage.getItem('jobLocation');

    try {
      const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=921e9db1&app_key=28b838d21e3565b4261207a743cd8b40&results_per_page=20&what_and=${jobTitle}&where=${jobLocation}`
      // const url = `https://www.themuse.com/api/public/jobs?category=${jobTitle}&location=${jobLocation}&page=1`
      const response = await fetch (url)
      const data = await response.json()

      console.log(data.results);
      

      // setCurrentJobs(data.results)
      // let jobValues = Object.values(data.results)
      dispatch(searchedJobs(data.results))
      // dispatch(searchedJobs([]))
      // dispatch(searchedJobs([]))
      // history.push('/jobs')
    }
    catch(error){
      console.log(error)
    }

  }

  // useEffect(() => {
  //   {jobs.forEach((job) => {

  //     return (
  //       <div className="card">
  //           <div className="card-body">
  //               <div className="card-title">
  //                   <h1>{job.title}</h1>
  //                   <h5>{job.company.display_name} | {job.location.display_name}</h5>
  //               </div>
  //               <div className="card-text">
  //                   <p>{job.description}</p>
  //                   <Link to={job.redirect_url} />
  //               </div>
  //           </div>
  //       </div>
  //     )
  // })}
  // }, [jobs])

const handleClick = () => {
  history.push('/home')
}



  return (
    <>
      <div class="container">
       
       <div className=" text-center">

         <div className="row">
          <Button className="btn-info mt-3 m-1" onClick={handleClick}>Home</Button>
         <h2 className="pt-1 text-white text-center w-100 " >Job Board </h2>
         </div>
        
        <h2 className="text-white mt-0"><span style={{fontSize: "25px"}}>It's never to early to start your search!</span></h2>
        </div> 
        {/* end title div */}
        <form>
          <div className="form-row">
            <div className="col">
              <input type="text" className="form-control" placeholder="Job Title" onChange={(e) => localStorage.setItem('jobTitle', e.target.value)}></input>
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="City" onChange={(e) => localStorage.setItem('jobLocation', e.target.value)}></input>
            </div>
          </div>
          <div className="col d-flex justify-content-start mt-2"><button class="col col-md-4 offset-md-4 btn btn-info" onClick={handleSearch}>Search</button></div>
          {/* end button div */}
        </form>

        
      </div>
    </>
  )
}

export default Form

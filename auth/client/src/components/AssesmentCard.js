import React, {useEffect, useState} from 'react';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import Assessment from './Assesment'
import axios from 'axios'
import {useSelector} from 'react-redux'

const AssesmentCard = () => {

    let language = useSelector((state => state.auth.language))
    const [Ratings, setRatings] = useState({})
    useEffect(()=>{
        const getData = () =>{
            axios.get("http://localhost:3001/assessments", {language})
            .then(res =>{
                let results = res.data
                let lastResult = results[results.length -1]
                setRatings(lastResult)
                console.log(res.data);
            }).catch(error =>console.log(error))
        }
    getData()
    }, [])
 
//  let lastRating = Ratings[Ratings.length -1].comment;
//  console.log(lastRating)
//  let displayComment = lastRating.comment;
console.log(Ratings)

    return (
        // <div className="mt-3">

        //     <Card className="shadow" style={{ width: '18rem' }}>
            // <Card.Header>Current Status on: {language}</Card.Header>

            // <Card.Body>
            // <Card.Title>{Ratings ? Ratings.rating : "No Assessment Available!"}</Card.Title>
            // <Card.Text>
            //  {Ratings ? Ratings.comment : "Fill out your Assessment!"}
            // </Card.Text>
            // </Card.Body>
        // </Card>
        // </div>

<div className="card shadow mt-4 mx-4 bg-white rounded">
          <div className="card-body" >
                          <div className="col" >
                                    <div className="d-flex align-items-end ">
                                  {/* <h2 className="mb-0 mr-2">Code Editor</h2> */}
                                  <h2 className="col" style={{fontSize: "24px"}}>Current Comfortability with: {language}</h2>
                                </div >
                                      <div className="linkContainer d-flex flex-column" >
                                      <div className="" style={{fontSize: "16px"}} >
                                      {Ratings ? Ratings.rating : "Complete Your Checkin' In Form"} <br/>
                                      {Ratings ? Ratings.comment : ""}
                                      </div>
                                      </div>
                                      {/* end link container */}
                                  </div>
            </div>
            {/* end card body */}
          </div>

    )
    }

export default AssesmentCard




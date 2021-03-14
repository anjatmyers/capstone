import React from 'react'
import {useSelector} from 'react-redux'

const Assessment = (props) => {

    const {
        assessHeadline
    } = props

    let language = useSelector((state => state.auth.language))

    const handleSubmit = (e) =>{
        e.preventDefault();


    }
  return (
    <>

    <div className="card shadow p-3 mb-5 mt-4 bg-white rounded ">
          <div className="card-body">
          <form>
      <div className="assessDiv form-group">
          <h2 className={assessHeadline}>Just Checkin' In...</h2>
          <h4>How do you feel about {language}?:</h4><br/>
          <select className="form-control">
              <option value="strong">Strong</option>
              <option value="average">Average</option>
              <option value="needWork">Need more Work</option>
              <option value="totallyLost">Totally Lost</option>
          </select><br/>
          <textarea className=" form-control" rows="2" name="comment" placeholder="Remind yourself what to work on..."></textarea> <br/>
          <button className={assessHeadline} onClick = {handleSubmit}>Submit Assessment</button>
      </div>
      </form>
        </div>
    </div>
    

    </>
  )
}

export default Assessment

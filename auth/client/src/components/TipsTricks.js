import React, {useState, useRef} from 'react'
import axios from 'axios'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'


const TipsTricks = (props) => {

const {
  headline,
  listColors,
  tipsDiv
} = props

const [tips, setTips] = useState([])

let tipsLanguage = useSelector((state => state.auth.language))

// SET VARIABLE TO CHANGE JSON FILE RETREIVAL TO EQUAL STATE

useEffect(()=>{
    const getData = () =>{ //Eventually, set ("javaScript.json") to (`${tips}.json`) to change with state
        axios.get(`TipsTricks/${tipsLanguage}.json`)
         .then(res =>{
         setTips(res.data[tipsLanguage]);
        }).catch(error =>(console.log('there was an error')))
    }

    getData();
}, [tipsLanguage])


let displayTipsTricks = tips.map((tips, index) =>{

    return <li className={index % 2 ? `${listColors} list-group-item` : `greyListItem list-group-item`} 

     >{tips.Tip}</li>
})



  return (
    <>
    <div className="shadow">
      <div className={tipsDiv}>
        <h3 className={headline}>{tipsLanguage} Tips and Tricks</h3>
          {/* <ul className={listColors}> */}
          {/* <div className={listColors}> */}
          <ul className="list-group">
              {displayTipsTricks}
          </ul>
          {/* </div> */}
      </div>
      </div>
    </>
  )
}

export default TipsTricks

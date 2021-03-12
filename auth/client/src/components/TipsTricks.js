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
console.log(tipsLanguage)



// SET VARIABLE TO CHANGE JSON FILE RETREIVAL TO EQUAL STATE

useEffect(()=>{
    const getData = () =>{ //Eventually, set ("javaScript.json") to (`${tips}.json`) to change with state
        axios.get(`TipsTricks/${tipsLanguage}.json`)
         .then(res =>{
          console.log(res.data[tipsLanguage])  
         setTips(res.data[tipsLanguage]);
        }).catch(error =>(console.log('there was an error')))
    }

    getData();
}, [tipsLanguage])

console.log(tips)

let displayTipsTricks = tips.map(tips =>{
    return <li>{tips.Tip}</li>
})



  return (
    <>
      <div className={tipsDiv}>
        <h3 className={headline}>{tipsLanguage} Tips and Tricks</h3>
          <ul className={listColors}>
              {displayTipsTricks}
          </ul>
      </div>
    </>
  )
}

export default TipsTricks

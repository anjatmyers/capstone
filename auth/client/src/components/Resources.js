import React, {useState, useRef} from 'react'
import {Link} from "@material-ui/core"
import axios from 'axios'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'


const Resources = (props) => {

    const {
      headline,
      listColors,
      tipsDiv
    } = props
    
    const [Links, setLinks] = useState([])
    
    let tipsLanguage = useSelector((state => state.auth.language))
    console.log(tipsLanguage)
    
    
    
    // SET VARIABLE TO CHANGE JSON FILE RETREIVAL TO EQUAL STATE
    
    useEffect(()=>{
        const getData = () =>{ //Eventually, set ("javaScript.json") to (`${tips}.json`) to change with state
            axios.get(`Resources/${tipsLanguage}.json`)
             .then(res =>{
              console.log(res.data[tipsLanguage])  
             setLinks(res.data[tipsLanguage]);
            }).catch(error =>(console.log('there was an error')))
        }
    
        getData();
    }, [tipsLanguage])
    
    console.log(Links)
    
    let displayLinks = Links.map(Links =>{
        console.log(Links.Link)
        return <li><Link href={Links.Link}/> {Links.Link}</li>
    })
    
    
      return (
        <>
          <div className={tipsDiv}>
            <h3 className={headline}>{tipsLanguage} Resources</h3>
              <ul className={listColors}>
                  {displayLinks}
              </ul>
          </div>
        </>
      )
    }
    
    export default Resources
    
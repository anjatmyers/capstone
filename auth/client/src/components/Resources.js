import React, {useState, useRef} from 'react'
import {Link} from "@material-ui/core"
import axios from 'axios'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import Button from "@material-ui/core/Button"
import { ListItem, List } from '@material-ui/core';



const Resources = (props) => {

    const {
      headline,
      listColors,
      tipsDiv
    } = props
    
    const [Links, setLinks] = useState([])
    
    let tipsLanguage = useSelector((state => state.auth.language))
    console.log(tipsLanguage)
    
    const handleClick = (link) => {
      window.open(link, '_blank');
    }
    
    
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
        return <div color="inherit" onClick={()=>handleClick(`${Links.Link}`)}>{Links.Link}</div>


        
    })
    
    
      return (
        <>
        <div className="card shadow p-3 mb-5 mt-4 bg-white rounded">
          <div className="card-body">
                          <div className={tipsDiv}>
                                    <div className="d-flex align-items-end ml-3">
                                  {/* <h2 className="mb-0 mr-2">Code Editor</h2> */}
                                  <h3 className={headline}>{tipsLanguage} Resources</h3>
                                </div >
                                      <div className="linkContainer d-flex flex-column">
                                      <div className={listColors}>
                                          {displayLinks}
                                      </div>
                                      </div>
                                      {/* end link container */}
                                  </div>
            </div>
            {/* end card body */}
          </div>
          {/* end card */}
          
        </>
      )
    }
    
    export default Resources
    
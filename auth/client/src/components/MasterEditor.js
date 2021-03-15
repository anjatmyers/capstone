import React, { useState}from 'react'
import {useSelector} from 'react-redux'
import EditorTemplate from './editorComponents/EditorTemplate'
import TipsTricks from './TipsTricks'
import Assessment from './Assesment'




function MasterEditor() {
  const [srcDoc, setSrcDoc] = useState('')




let language = useSelector((state => state.auth.language))


const setLanguage = (language) =>{
  switch(language){
    case "javaScript":
      return (
        < EditorTemplate
        language= "javascript"
        displayName = "JavaScript"
        heading = "pane top-pane"

        />
      )
    case "python":
      return (
        < EditorTemplate 
        language="python"
        displayName="Python"
        heading = "pane py-top-pane"
        />
      )
    case "sql":
      return (
       < EditorTemplate 
       language="sql"
       displayName="SQL Queries"
       heading= "pane sql-top-pane"
       />
      )
    case "shell":
      return (
        < EditorTemplate 
        language="shell"
        displayName="Shell(Terminal)"
        heading = "pane shell-top-pane"
        />
      )
    case "html":
      return (
        <>
        < EditorTemplate 
        language="xml"
        displayName="HTML"
        heading = "pane xml-top-pane"
        />
        < EditorTemplate 
        language = "css"
        displayName="CSS"
        heading = "pane css-top-pane"
        />
        </>
      )
    default:
      return <EditorTemplate 
      language="javascript"
      displayName="JavaScript"
      />

  }
}

const setTipStyles = (language) =>{
  switch(language){
    case "javaScript":
      return (
        < TipsTricks 
        headline = "headlineJS"
        listColors = "ULlistJS"
        tipsDiv = "tipsDivJS"
        />        
      )
    case "python":
      return (
        < TipsTricks 
        headline = "headlinePY"
        listColors = "ULlistPY"
        tipsDiv = "tipsDivPY"
        />
      )
      case "sql":
        return (
        <TipsTricks 
        headline = "headlineSQL"
        listColors = "ULlistSQL"
        tipsDiv = "tipsDivSQL"
        />
      )
      case "shell":
        return (
        <TipsTricks 
        headline = "headlineShell"
        listColors = "ULlistShell"
        tipsDiv = "tipsDivShell"
        />
      )
      case "html":
        return (
        <TipsTricks 
        headline = "headlineHTMLCSS"
        listColors = "ULlistHTMLCSS"
        tipsDiv = "tipsDivHTML"
        />
      )
      default:
        return <TipsTricks 
        headline = "headlineJS"
        listColors = "ULlistJS"
        />
    }
  }

  const setAssessHeadline = (language) =>{
    switch (language) {
      case "javaScript":
        return (
        <Assessment 
        assessHeadline = "assessHeadlineJS"
        />
      )
      case "python":
        return (
        <Assessment 
        assessHeadline = "assessHeadlinePY"
        />  
        )
      case "sql":
        return (
        <Assessment 
        assessHeadline = "assessHeadlineSQL"
        />  
        )
      case "shell":
        return (
        <Assessment 
        assessHeadline = "assessHeadlineShell"
        />
        )
      case "html":
        return (
        <Assessment 
        assessHeadline = "assessHeadlineHTML"
        />
        )
      default:
        return (
        <Assessment 
        assessHeadline = "assessHeadlineJS"
        />
        )
    }
  }



  return (
    <>
    {setLanguage(language)}
    
   {/* <br></br> */}
    <div className="console" >
       <iframe className="iFrame"
        // value={javaScript}
        srcDoc={srcDoc}
        title="console"
        sandbox="allow-scripts"
        width="100%"

        />
    
    </div>
    <div>
    {setTipStyles(language)}
    </div>
    {setAssessHeadline(language)}
  </>
  )
}

export default MasterEditor;
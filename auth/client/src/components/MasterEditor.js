import React, { useState, useEffect }from 'react'
import {useSelector} from 'react-redux'
import EditorTemplate from './editorComponents/EditorTemplate'

// import JS from './editorComponents/JS'
// import Shell from './editorComponents/SHELL'
// import PY from './editorComponents/PY'
// import SQLsetup from './editorComponents/SQLsetup'
// import HTMLCSS from './editorComponents/HTMLCSS'



function MasterEditor() {
  // const [javaScript, setjavaScript] = useState('//Console Logs will display in Chrome\'s Developer Tools!  Refresh the page to clear.')
  // const [python, setPython] = useState('#Add Python code here!')
  // const [html, setHTML] = useState('<!-- Type your HTML here! -->')
  // const [css, setCss] = useState('/*Style your CSS here!*/')
  // const [sql, setSql] = useState('-- Build SQL queries here!')
  // const [shell, setShell] = useState('#Type shell commands here!')
  const [srcDoc, setSrcDoc] = useState('')


//   const programs = [
//     {
//         value : javaScript,
//         language: "javascript",
//         style: "pane top-pane",
//         display: "JavaScript",
//         onChange : setjavaScript,
//         editor: JS
//     },
//     {
//         value: python,
//         language: "python",
//         style: "pane py-top-pane",
//         display: "Python",
//         onChange : setPython,
//         editor: PY
//     },
//     {
//         value: shell,
//         language: "shell",
//         style: "pane shell-top-pane",
//         display: "Shell(Terminal)",
//         onChange : setShell,
//         editor: Shell
//     },
//     {
//         value: sql,
//         language: "sql",
//         style: "pane sql-top-pane",
//         display: "SQL Queries",
//         onChange : setSql,
//         editor: SQLsetup
//     },
//     {
//        value: [html, css],
//        language: ["xml","css"],
//        style: ["pane xml-top-pane", "pane css-top-pane"],
//        display: ["HTML, CSS"],
//        onChange : [setHTML, setCss],
//        editor : [HTMLCSS, HTMLCSS]

//     }
// ]


  
//   useEffect(()=>{


//     const timeout = setTimeout(()=>{
//       setSrcDoc(
//         `
//     <html>
//       <script>${javaScript}</script>
//       </html>
//   `
//   )
//     }, 750)
//     return () => clearTimeout(timeout)
//   }, [javaScript])

let language = useSelector((state => state.auth.language))


const setLanguage = (language) =>{
  console.log(language)
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

  return (
    <>
    {setLanguage(language)}
    

    <div className="console" >
       <iframe className="iFrame"
        // value={javaScript}
        srcDoc={srcDoc}
        title="console"
        sandbox="allow-scripts"
        width="100%"

        />
    
    </div>
  </>
  )
}

export default MasterEditor;
import React, {useState} from 'react';
import axios from 'axios'
import '../editorComponents/editorstyles.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import {Controlled as ControlledEditor} from 'react-codemirror2'

export default function EditorTemplate(props) {
    const [input, setInput] = useState('')

    const {
        language,
        displayName,
        heading
    } = props

    function handleChange(editor, data, value) {
        setInput(value)

    }
    // console.log(input);

    const saveFile = () => {

        const files = async () => {
            console.log(language)
            let response = await axios.post(`http://localhost:3001/createFile/${language}`, {input}, {
            headers: {
            "content-type": "application/json",
            authorization: localStorage.getItem('token'),
            }})
    
            console.log(response.data)
        }
        files();
        console.log('file created')
        }

    

  return (
    <div className={heading}>
    <div className="editor-container">
        <div className="editor-title">
            <h3>{displayName}</h3>
        </div>
        <ControlledEditor
         onBeforeChange={handleChange}
         value={input}
         className="code-mirror-wrapper"
         options={{
             lineWrapping: true,
             lint: true,
             mode: language,
             theme: 'material',
             lineNumbers: true
         }}
        />

    </div>
    <input type="email" placeholder="Title this snippet"
                // value={email}
                // onChange={(e)=>setEmail(e.target.value)}
              />
    <button onClick={saveFile}>Save to Google Drive</button>
    </div>
  );
}

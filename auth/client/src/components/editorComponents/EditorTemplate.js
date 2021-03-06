import React, {useState} from 'react';
import Paper from "@material-ui/core/Paper"
import axios from 'axios'
import {setEditorInput} from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import UpdateFile from '../../components/pickerComponents/UpdateFile';
import DeleteFile from '../../components/pickerComponents/DeleteFile';
import AuthorizeGoogle from '../../components/pickerComponents/AuthorizeGoogle';
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
import Button from '@material-ui/core/Button';

export default function EditorTemplate(props) {
    const [input, setInput] = useState('')
    const [title, setTitle] = useState('')
    const dispatch = useDispatch();

    const {
        language,
        displayName,
        heading
    } = props

    function handleChange(editor, data, value) {
        setInput(value)
        dispatch(setEditorInput(input))
    }

    const saveFile = () => {

        const files = async () => {
            

            let response = await axios.post(`http://localhost:3001/createFile/${language}`,

             {

                input: input,
                title: title,
            }, {

            headers: {
            "content-type": "application/json",
            authorization: localStorage.getItem('token'),
            }})
    
        }
        files();
        console.log('file created')
        alert(title + " has been saved!");
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
             lineNumbers: true,
             cursorBlinkRate: 900,
         }}
        />

    </div>

    <div className="container-fluid row justify-content-start d-flex align-items-center">

    <div className="col-lg-3 col-3"><input className="input m-1 m-lg-3 p-1 mt-3 mt-lg-4 editorInput" type="email" placeholder="Title this snippet" value={title} onChange={(e)=>setTitle(e.target.value)} /></div>
    <div className="col-lg-8 offset-md-1 offset-0 col-11 d-flex">
    <div><button className='btn btn-sm btn-success mx-1 my-2 my-lg-3' onClick={saveFile} >Save to Drive</button></div>

    <div className="mx-1 my-2 my-lg-3"> <AuthorizeGoogle /></div>
    <div className="mx-1 my-2 my-lg-3"> <UpdateFile /></div>
    <div className="mx-1 my-2 my-lg-3"> <DeleteFile /></div>
    </div>
    {/* end button div */}
    </div>
    {/* end of buttons/title input div */}
    </div>
  );
}

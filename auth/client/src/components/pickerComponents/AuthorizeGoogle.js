import React from 'react';
import axios from 'axios';
import {getURL, folderStatus} from '../../actions/index';
import {useDispatch, useSelector} from 'react-redux';



const AuthorizeGoogle = () => {

    const dispatch = useDispatch();
    // function for google docs button
  const handleDocs = () => {

    dispatch(getURL());
  }


  return (
    <>
      <div className="">
            <button className='btn btn-sm btn-primary' onClick={handleDocs}>Access Google Drive</button>
       
    </div>
    </>
  )
}

export default AuthorizeGoogle
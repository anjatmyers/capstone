import React from 'react';
import axios from 'axios';
import {getURL, folderStatus, hideButton} from '../../actions/index';
import {useDispatch, useSelector} from 'react-redux';



const AuthorizeGoogle = () => {

    const dispatch = useDispatch();
    // function for google docs button

    // dispatch(hideButton(true))

    const buttonStatus = useSelector(state => state.auth.hideButton)

  const handleDocs = () => {

    dispatch(hideButton(false))
    dispatch(getURL());
  }


  return (
    <>
      <div className="">
        {buttonStatus
        ?
        <button className='btn btn-sm btn-primary' onClick={handleDocs}>Access Google Drive</button>
        :
        null
        }
    </div>
    </>
  )
}

export default AuthorizeGoogle
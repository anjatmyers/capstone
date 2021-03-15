import React, { useEffect } from "react";
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';

const CompleteCallback = () => {
  let { code } = useParams();
  let history = useHistory();


  useEffect(() => {
    //make api call with jwt and code
 
    const completeAuth = async () => {
        let response = await axios.post('http://localhost:3001/completeAuth',{
            code: code
        },
        {
            headers: {
            "content-type": "application/json",
            authorization: localStorage.getItem('token'),
            },
        });
    }

    completeAuth();
    history.push('/home')
    

  }, []);
  return <>Authenticating User</>;
};

export default CompleteCallback;
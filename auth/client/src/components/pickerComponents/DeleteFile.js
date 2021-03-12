import React from 'react'
import GooglePicker from 'react-google-picker'

import axios from 'axios';
import{ DEVELOPER_KEY, CLIENT_ID, PROJECT_ID, SCOPE} from './PickerAuth'



const DeleteFiles = () => {

  //   // The Browser API key obtained from the Google API Console.
  //   // Replace with your own Browser API key, or your own key.
  //  const DEVELOPER_KEY = 'AIzaSyDtfLT7dhV0OqyVZjdHhRulKKkkIGRpvII';

  //   // The Client ID obtained from the Google API Console. Replace with your own Client ID.
  //   const CLIENT_ID = "726744960586-a12bvs5oko19o85t0h40jlaapbo28b9u.apps.googleusercontent.com"

  //   // Replace with your own project number from console.developers.google.com.
  //   // See "Project number" under "IAM & Admin" > "Settings"
  //   const PROJECT_ID = "capstone-project-dc";

  //   // Scope to use to access user's Drive items.
  //   const SCOPE = ['https://www.googleapis.com/auth/drive'];

    const deleteFiles = (id) => {

    
        const files = async () => {
            console.log(id)
            let userID = localStorage.getItem('id')
            console.log(userID)
          let response = await axios.post('http://localhost:3001/delete', {id, userID}, {
            headers: {
            "content-type": "application/json",
            authorization: localStorage.getItem('token'),
            }})
    
            console.log(response.data)
        }
        files();
        
      }



  return (
    <>
      <div className="container">

        <GooglePicker clientId={CLIENT_ID}
                      developerKey={DEVELOPER_KEY}
                      scope={SCOPE}
                      onChange={data => console.log('on change:', data)}
                      onAuthFailed={data => console.log('on auth failed:', data)}
                      multiselect={true}
                      navHidden={true}
                      authImmediate={false}

                      viewId={'DOCS'}
                      sandbox="allow-scripts"
                      createPicker={ (google, oauthToken) => {
                          const googleViewId = google.picker.ViewId.DOCS;
                          const docsView = new google.picker.DocsView(googleViewId)
                              .setIncludeFolders(true)
                              .setMimeTypes(['text/plain', 'application/vnd.google-apps.file', 'application/vnd.google-apps.folder'])

                              .setSelectFolderEnabled(true);

                          const picker = new window.google.picker.PickerBuilder()
                            .addView(docsView)
                            .setOAuthToken(oauthToken)
                            .setDeveloperKey(DEVELOPER_KEY)
                            //   .setCallback(()=>{
                            //     console.log('Custom picker is ready!');
                            //   });
                            .setCallback((data) => {

                                if (data.action == google.picker.Action.PICKED) {

                                let fileId = data.docs[0].id;
                                let fileName = data.docs[0].name
                                alert(fileName + " has been deleted!");
                                deleteFiles(fileId)
                                }
                            }

                            )

                          picker.build().setVisible(true);
                      }}
        >

            
            <button className='btn btn-danger m-2'>Delete File</button>

            <div className="google"></div>
        </GooglePicker>
    </div>
    </>
  )
}


export default DeleteFiles


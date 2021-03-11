import React from 'react'
import GooglePicker from 'react-google-picker'


const Picker = () => {

    // The Browser API key obtained from the Google API Console.
    // Replace with your own Browser API key, or your own key.
   const DEVELOPER_KEY = 'AIzaSyDtfLT7dhV0OqyVZjdHhRulKKkkIGRpvII';

    // The Client ID obtained from the Google API Console. Replace with your own Client ID.
    const CLIENT_ID = "726744960586-a12bvs5oko19o85t0h40jlaapbo28b9u.apps.googleusercontent.com"

    // Replace with your own project number from console.developers.google.com.
    // See "Project number" under "IAM & Admin" > "Settings"
    const PROJECT_ID = "capstone-project-dc";

    // Scope to use to access user's Drive items.
    var SCOPE = ['https://www.googleapis.com/auth/drive'];


    

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
                      viewId={'FOLDERS'}
                      createPicker={ (google, oauthToken) => {
                          const googleViewId = google.picker.ViewId.FOLDERS;
                          const docsView = new google.picker.DocsView(googleViewId)
                              .setIncludeFolders(true)
                              .setMimeTypes('application/vnd.google-apps.folder')
                              .setSelectFolderEnabled(true);

                          const picker = new window.google.picker.PickerBuilder()
                              .addView(docsView)
                              .setOAuthToken(oauthToken)
                              .setDeveloperKey(DEVELOPER_KEY)
                              .setCallback(()=>{
                                console.log('Custom picker is ready!');
                              });

                          picker.build().setVisible(true);
                      }}
        >
            <button>Click Picker</button>
            <div className="google"></div>
        </GooglePicker>
    </div>
    </>
  )
}

export default Picker

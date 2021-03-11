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

    // function pickerCallback(data) {
    //     function pickerCallback(data) {
    //         if (data.action == google.picker.Action.PICKED) {
    //           var fileId = data.docs[0].id;
    //           alert('The user selected: ' + fileId);
    //         }
    //       }
    //   }


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
                    mimeTypes={['text/plain', 'application/vnd.google-apps.file', 'application/vnd.google-apps.folder']}
                    viewId={'DOCS'}>
        <span>Click me!</span>
        <div className="google"></div>
      </GooglePicker>
        <br/>
        <hr/>
        <br/>
        <GooglePicker clientId={CLIENT_ID}
                      developerKey={DEVELOPER_KEY}
                      scope={SCOPE}
                      onChange={data => console.log('on change:', data)}
                      onAuthFailed={data => console.log('on auth failed:', data)}
                      multiselect={true}
                      navHidden={true}
                      authImmediate={false}
                      viewId={'DOCS'}
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
                                var fileId = data.docs[0].id;
                                alert('The user selected: ' + fileId);
                                }
                            }
                            )

                          picker.build().setVisible(true);
                      }}
        >
            <span>Click for Picker</span>
            <div className="google"></div>
        </GooglePicker>
    </div>
    </>
  )
}

export default Picker


// .setCallback((data) => {

//     if (data.action == google.picker.Action.PICKED) {
//       var fileId = data.docs[0].id;
//       alert('The user selected: ' + fileId);
//     }

// }
// )

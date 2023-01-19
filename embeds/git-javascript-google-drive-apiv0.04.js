// this source code used updated google sign in options 
// after the previous button is deprecated
window.onload = () => {
    gapiLoaded();
    gisLoaded()
}

var CLIENT_ID = '639609669934-eaescllh1k9fpp4nggtdoh1lc0p8kihh.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAXs-Hb9cjDptjCqjS2ST5gd0_c7KbSvAM';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive';
var signinButton = document.getElementsByClassName('signin')[0];
var signoutButton = document.getElementsByClassName('signout')[0];
let tokenClient;
let gapiInited = false;
let gisInited = false;

function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
    });
    gapiInited = true;
    maybeEnableButtons();
}

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: ''
    });
    gisInited = true;
    maybeEnableButtons();
}

function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        signinButton.style.display = 'block'
    }
}

signinButton.onclick = () => handleAuthClick()
function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        signinButton.style.display = 'none'
        signoutButton.style.display = 'block'
        console.log('Sign-in Successful');
    };

    if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

signoutButton.onclick = () => handleSignoutClick()
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        signinButton.style.display = 'block'
        signoutButton.style.display = 'none'
    }
}

// check for a Backup Folder in google drive
function checkFolder() {
    gapi.client.drive.files.list({
        // give name of the folder to check
        'q': 'name = "Backup Folder"',
    }).then(function (response) {
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log('Folder Available');
            }
        } else {
            // if folder not available
            console.log('Folder not available');
        }
    })
}

// now create a function to upload file
function upload() {
    // set file metadata
    var metadata = {
        name: 'name.txt',
        mimeType: 'plain/text',
        parents: [parent_Folder_id]
    };
    var formData = new FormData();
    formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    // set file as blob formate
    formData.append("file", file_in_blob_formate);
    fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
        method: 'POST',
        headers: new Headers({ "Authorization": "Bearer " + gapi.auth.getToken().access_token }),
        body: formData
    }).then(function (response) {
        return response.json();
    }).then(function (value) {
        console.log(value);
        // file is uploaded
    });
}

function createFolder() {
    var access_token = gapi.auth.getToken().access_token;
    var request = gapi.client.request({
        'path': 'drive/v2/files',
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
        'body': {
            'title': 'Backup Folder',
            'mimeType': 'application/vnd.google-apps.folder'
        }
    });
    request.execute(function (response) {
        // folder is created
        console.log(response);
    })
}

// function for files list
function showList() {
    gapi.client.drive.files.list({
        'q': `parents in "${parent_Folder_id}"`
    }).then(function (response) {
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                console.log(files[i]);
            }
        } else {
            // no file available in given folder
        }
    })
}

function downloadFile() {
    // only file can be download able not folder or zip
    gapi.client.drive.files.get({
        // give id of file to download
        fileId: id_of_file,
        alt: 'media'
    }).then(function (res) {
        // set the different type if file is not text file
        var blob = new Blob([res.body], { type: 'plain/text' });
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        // give file name
        a.download = 'file-name';
        a.click();
    })
}

// new create update function
function update() {
    // this will overwrite the available file with new file
    var url = 'https://www.googleapis.com/upload/drive/v3/files/' + file_id_here + '?uploadType=media';
    fetch(url, {
        method: 'PATCH',
        headers: new Headers({
            Authorization: 'Bearer ' + gapi.auth.getToken().access_token,
            // set header Content-type according to file type
            'Content-type': 'plain/text'
        }),
        // you can update a file by giving blob in FormData()
        body: 'new text for update'
    }).then(value => {
        console.log('File updated successfully');
    }).catch(err => console.error(err))
}

function deleteFile() {
    var request = gapi.client.drive.files.delete({
        // give file id to delete
        'fileId': id_of_file
    });
    request.execute(function (res) {
        console.log('File Deleted');
    })
}
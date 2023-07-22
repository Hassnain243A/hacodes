const firebaseConfig = {
    apiKey: "AIzaSy***************",
    authDomain: "sa*******.firebaseapp.com",
    projectId: "sa******",
    messagingSenderId: "850******",
    appId: "1:8507********"
};
const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
messaging.getToken({ vapidKey: "BI8f1hb-vcsbUifpdiNu**********" })
messaging.onMessage((payload) => {
    console.log('Message received ', payload);
    const messagesElement = document.querySelector('.message')
    const dataHeaderElement = document.createElement('h5')
    const dataElement = document.createElement('pre')
    dataElement.style = "overflow-x: hidden;"
    dataHeaderElement.textContent = "Message Received:"
    dataElement.textContent = JSON.stringify(payload, null, 2)
    messagesElement.appendChild(dataHeaderElement)
    messagesElement.appendChild(dataElement)
})

importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')

messaging.getToken({ vapidKey: "BI8f1hb-vcsbUifpdiNu**********" }).then((currentToken) => {
    console.log(currentToken);
    document.querySelector('body').append(currentToken)
    sendTokenToServer(currentToken)
}).catch((err) => {
    console.log(err);
    // if error
    setTokenSentToServer(false)
})

function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
        console.log('Sending token to server ...');
        setTokenSentToServer(true)
    } else {
        console.log('Token already available in the server');
    }
}
function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1'
}
function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0')
}

// get this type of message in background
messaging.onBackgroundMessage(function (payload) {
    if (!payload.hasOwnProperty('notification')) {
        const notificationTitle = payload.data.title
        const notificationOptions = {
            body: payload.data.body,
            icon: payload.data.icon,
            image: payload.data.image
        }
        self.registration.showNotification(notificationTitle, notificationOptions);
        self.addEventListener('notificationclick', function (event) {
            const clickedNotification = event.notification
            clickedNotification.close();
            event.waitUntil(
                clients.openWindow(payload.data.click_action)
            )
        })
    }
})
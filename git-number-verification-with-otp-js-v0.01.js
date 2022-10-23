// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3MIN64hy_oTQfQWUHl0lID-CJkIfci0M",
    authDomain: "yt-project-a29f8.firebaseapp.com",
    projectId: "yt-project-a29f8",
    storageBucket: "yt-project-a29f8.appspot.com",
    messagingSenderId: "159898773748",
    appId: "1:159898773748:web:2985334de4f06ff73356a1",
    measurementId: "G-DLWR9M5SJC"
};
// initializing firebase SDK
firebase.initializeApp(firebaseConfig);
// render recaptcha verifier
render();
function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}
// function for send OTP
function phoneAuth() {
    var number = document.getElementById('number').value;
    firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier).then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        coderesult = confirmationResult;
        console.log('OTP Sent');
    }).catch(function (error) {
        // error in sending OTP
        alert(error.message);
    });
}
// function for OTP verify
function codeverify() {
    var code = document.getElementById('verificationcode').value;
    coderesult.confirm(code).then(function () {
        console.log('OTP Verified');
    }).catch(function () {
        console.log('OTP Not correct');
    })
}